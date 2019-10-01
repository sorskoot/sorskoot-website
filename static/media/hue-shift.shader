uniform float speed;
uniform float stepsize;
uniform float shift;

float3 rgb2hsv(float3 c)
{
    float4 K = float4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    float4 p = lerp(float4(c.bg, K.wz), float4(c.gb, K.xy), step(c.b, c.g));
    float4 q = lerp(float4(p.xyw, c.r), float4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return float3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

float3 hsv2rgb(float3 c)
{
    float4 K = float4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    float3 p = abs(frac(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * lerp(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float rand(float co){
    return frac(sin(dot(float2(co,co) ,float2(12.9898,78.233))) * 43758.5453);
}

float4 mainImage(VertData v_in) : TARGET
{
  float4 color = image.Sample(textureSampler, v_in.uv);
  float3 hsv = rgb2hsv(color);
  float t = trunc((elapsed_time * speed/10) * stepsize)/stepsize;
  float r = rand(t);
  hsv.x = r + hsv.x + shift;
  
  float3 final = hsv2rgb(hsv);  
  return float4(final, 1.0);  

}