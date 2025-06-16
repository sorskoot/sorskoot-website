#include "lib/Compatibility.glsl"

#define USE_LIGHTS

#define FEATURE_TEXTURED
#define FEATURE_ALPHA_MASKED
#define FEATURE_VERTEX_COLORS
#define FEATURE_NORMAL_MAPPING
#define FEATURE_WITH_EMISSIVE
#define FEATURE_LIGHTMAP
#define FEATURE_LIGHTMAP_MULTIPLY_ALBEDO
#define FEATURE_OCCLUSION_TEXTURE
#define FEATURE_SEPARATE_OCCLUSION_TEXTURE
#define FEATURE_GLOBAL_ILLUMINATION
#define FEATURE_GLOBAL_ILLUMINATION_PROBE_VOLUME
#define FEATURE_TONEMAPPING
#define FEATURE_SHADOW_PCF
#define FEATURE_SHADOW_NORMAL_OFFSET_SCALE_BY_SHADOW_DEPTH
#define FEATURE_SHADOW_NORMAL_OFFSET_UV_ONLY
#define FEATURE_SHADOW_NORMAL_OFFSET_SLOPE_SCALE
#define FEATURE_WITH_FOG

#ifdef NORMAL_MAPPING
#define TEXTURED
#endif
#ifdef LIGHTMAP
#define TEXTURED
#endif
#ifdef OCCLUSION_TEXTURE
#define TEXTURED
#endif
#ifdef GLOBAL_ILLUMINATION
#define TEXTURED
#endif

#define USE_POSITION_WORLD
#define USE_NORMAL
#define USE_MATERIAL_ID
#ifdef TEXTURED
#define USE_TEXTURE_COORDS
#endif
#ifdef NORMAL_MAPPING
#define USE_TANGENT
#endif
#ifdef LIGHTMAP
#define USE_TEXTURE_COORDS_1
#endif
#ifdef VERTEX_COLORS
#define USE_COLOR
#endif

#if NUM_SHADOWS > 0
#define USE_POSITION_VIEW
#endif

#include "lib/Uniforms.glsl"
#include "lib/Inputs.glsl"
#include "lib/Math.glsl"
#include "lib/Color.glsl"

#if NUM_LIGHTS > 0 || defined(WITH_FOG)
#include "lib/Quaternion.glsl"
#include "lib/Lights.glsl"
#endif

#ifdef TEXTURED
#include "lib/Textures.glsl"
#endif
#include "lib/Surface.glsl"
#include "lib/Packing.glsl"
#include "lib/Materials.glsl"

#if defined(GLOBAL_ILLUMINATION) || defined(GLOBAL_ILLUMINATION_PROBE_VOLUME)
#include "lib/CoordinateSystems.glsl"
#include "lib/GI.glsl"
#endif

#include "lib/PhysicalBSDF.glsl"

struct Material {
    lowp vec4 albedoColor;
#ifdef WITH_EMISSIVE
    lowp vec4 emissiveColor;
#endif
#ifdef WITH_FOG
    lowp vec4 fogColor;
#endif
    lowp float metallicFactor;
    lowp float roughnessFactor;
#ifdef TEXTURED
    mediump uint albedoTexture;
#ifndef SEPARATE_OCCLUSION_TEXTURE
    mediump uint occlusionRoughnessMetallicTexture;
#else
    mediump uint roughnessMetallicTexture;
#endif
#ifdef WITH_EMISSIVE
    mediump uint emissiveTexture;
#endif
#ifdef NORMAL_MAPPING
    mediump uint normalTexture;
#endif
#ifdef LIGHTMAP
    mediump uint lightmapTexture;
    lowp float lightmapFactor;
#endif
#ifdef OCCLUSION_TEXTURE
#ifdef SEPARATE_OCCLUSION_TEXTURE
    mediump uint occlusionTexture;
#endif
    lowp float occlusionFactor;
#endif
#endif
};

Material decodeMaterial(uint matIndex) {
    {{decoder}}
    return mat;
}

void main() {
    #ifdef TEXTURED
    alphaMask(fragMaterialId, fragTextureCoords);
    #endif

    Material mat = decodeMaterial(fragMaterialId);

    lowp vec4 albedo =
        #ifdef VERTEX_COLORS
        fragColor*
        #endif
        mat.albedoColor;

    #ifdef TEXTURED
    if(mat.albedoTexture > 0u) {
        albedo *= textureAtlas(mat.albedoTexture, fragTextureCoords);
    }
    #endif
    albedo = srgbToLinear(albedo);

    lowp float ao = 1.0;
    float roughness = mat.roughnessFactor;
    float metallic = mat.metallicFactor;
    #ifdef TEXTURED
    #ifndef SEPARATE_OCCLUSION_TEXTURE
    if(mat.occlusionRoughnessMetallicTexture > 0u) {
        lowp vec3 orm = textureAtlas(mat.occlusionRoughnessMetallicTexture, fragTextureCoords).rgb;
        #ifdef OCCLUSION_TEXTURE
        ao = mix(1.0, orm.r, mat.occlusionFactor);
        #endif
        roughness *= orm.g;
        metallic *= orm.b;
    }
    #else
    if(mat.roughnessMetallicTexture > 0u) {
        lowp vec3 rm = textureAtlas(mat.roughnessMetallicTexture, fragTextureCoords).rgb;
        roughness *= rm.g;
        metallic *= rm.b;
    }
    #ifdef OCCLUSION_TEXTURE
    if(mat.occlusionTexture > 0u) {
        float occlusion = textureAtlas(mat.occlusionTexture, fragTextureCoords).r;
        ao = mix(1.0, occlusion, mat.occlusionFactor);
    }
    #endif
    #endif
    #endif

    /* Normal */
    #ifdef NORMAL_MAPPING
    SurfaceData surface = computeSurfaceData(fragNormal, fragTangent);
    mediump vec3 normal = normalMapping(surface, mat.normalTexture);
    #else
    SurfaceData surface = computeSurfaceData(fragNormal);
    mediump vec3 normal = surface.normal;
    #endif

    PhysicalBSDF bsdf = createPhysicalBSDF(albedo.rgb, metallic, roughness);
    vec3 view = normalize(viewPositionWorld - fragPositionWorld);

    vec3 col = vec3(0.0);

    #ifdef TEXTURED
    #ifdef LIGHTMAP
    lowp vec4 lightmap =
        textureAtlas(mat.lightmapTexture, fragTextureCoords1)*mat.lightmapFactor;
    #ifndef LIGHTMAP_MULTIPLY_ALBEDO
    col += lightmap.rgb;
    #else
    col += lightmap.rgb*albedo.rgb;
    #endif
    #endif
    #endif

    /* Environment contribution */
    #ifdef GLOBAL_ILLUMINATION
    col += evaluateEnvironment(normal, view, bsdf.diffuse, bsdf.perceptualRoughness, bsdf.specular, ao);
    #endif

    /* Probe volume contribution */
    #ifdef GLOBAL_ILLUMINATION_PROBE_VOLUME
    col += evaluateProbeVolume(fragPositionWorld, normal, bsdf.diffuse);
    #endif

    /* Punctual lights contribution */
    col += evaluateDirectLights(bsdf, view, normal);

    #ifdef WITH_EMISSIVE
    vec4 emissive = mat.emissiveColor;
    #ifdef TEXTURED
    if(mat.emissiveTexture != 0u) {
        emissive *= textureAtlas(mat.emissiveTexture, fragTextureCoords);
    }
    #endif
    col += emissive.a*srgbToLinear(emissive.rgb);
    #endif

    #ifdef WITH_FOG
    #ifdef REVERSE_Z
    float dist = (1.0 - gl_FragCoord.z)/gl_FragCoord.w;
    #else
    float dist = gl_FragCoord.z/gl_FragCoord.w;
    #endif
    float fogFactor = fogBlendFactor(dist, mat.fogColor.a*0.2);
    col = mix(col, mat.fogColor.rgb, fogFactor);
    #endif

    #ifdef TONEMAPPING
    col = tonemap(col);
    #endif

    outColor = linearToSrgb(vec4(col, 1.0));
}
