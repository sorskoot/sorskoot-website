---
draft: true
---

# WebXR Magic: Unveiling the Mysteries of modelViewMatrix and normalMatrix 🎩🔮

Hello Coders! 👾

Get ready for an adventure as we journey into the captivating world of WebXR. Our mission? To uncover the secrets behind `modelViewMatrix` and `normalMatrix`. Let's gear up, it's time to decode!

## Matrix Unveiled: What are modelViewMatrix and normalMatrix? 🧩

Before we go matrix hunting, let's understand what these elusive matrices really are.

The `modelViewMatrix` is this cool transformation matrix that combines the model matrix (the transformation applied to the object) with the view matrix (the transformation applied to the camera). What it does is transform coordinates from object space (3D) into eye space. Pretty neat, right?

Moving on to `normalMatrix`, things get a tad trickier. When transformations come into play, they need to be applied not just to the vertices of an object but also its normals (those vectors that are perpendicular to the surface). However, normals should only be rotated, not translated or scaled. Enter our superhero matrix - `normalMatrix`. This matrix is essentially an inverse transpose of the `modelViewMatrix` used to transform normal vectors properly.

---

It's all about moving and changing things in 3D space. Let's think of it as if we are arranging the furniture in a room.

modelViewMatrix is like the master plan for setting up your room. The model matrix represents how you move or change each piece of furniture - like rotating your chair or moving your table to the corner. Then the view matrix comes into play, this is like you deciding where you will stand in the room to get the best view. When combined, modelViewMatrix changes everything according to your taste and point of view. Essentially, it converts everything from their original positions (3D space) to their new positions as per your perspective (eye space).

Moving on to normalMatrix, imagine now that each piece of furniture has little arrows sticking out from them, representing which way is up - these are like normals. When you move furniture around with rotations (like tilting), these arrows still keep pointing upwards because they're only allowed to rotate with the furniture. They aren't allowed to move independently or stretch/squish as they must always show true 'up'.

But here is where it gets complex: when our master plan (modelViewMatrix) includes non-uniform scaling (stretching along one direction more than others), those arrows can start pointing in wrong directions! That's why we need our hero - normalMatrix. This is specially created by doing some mathematical magic (inverse transpose) on our master plan (modelViewMatrix). It corrects those arrows so even after all the moving, rotating and stretching of furniture, they will still correctly point 'up'.

In a nutshell, these matrices help us manage how we manipulate objects and their orientations within a 3D environment - pretty much like an interior designer!

---

## The Matrix Code: How do we use them? 💻

Now let's slice and dice some code!

```js
const modelViewMatrix = mat4.create();
const normalMatrix = mat4.create();

for(const view of pose.views){
  //...
  for(const obj of world.objects){
  
    mat4.multiply(modelViewMatrix, view.transform.inverse.matrix, obj.matrix);
    mat4.invert(normalMatrix, modelViewMatrix);
    mat4.transpose(normalMatrix, normalMatrix);

    obj.render(modelViewMatrix, normalMatrix);
  }
}
```

Here we go! We first initialize our matrices using `mat4.create()`. Then for each view in our pose and each object in our world, we:

1. Compute the `modelViewMatrix` by multiplying the inverse of our view's transformation matrix by our object's matrix.
2. Compute the `normalMatrix` by taking the inverse of our freshly baked `modelViewMatrix`.
3. Transpose our hot-off-the-oven `normalMatrix`.
4. Finally, we render our object passing both matrices as parameters.

That wasn't too tough now, was it?

## Shader Fun: Using them in a simple shader? 🎨

Ready for some more fun? Let's see how these matrices are used in a vertex shader:

```glsl
uniform mat4 uModelViewMatrix;
uniform mat4 uNormalMatrix;

vec3 transformedNormal = normalize(vec3(uNormalMatrix * vec4(aVertexNormal, 0.0)));
vec4 positionInEyeCoords = uModelViewMatrix * vec4(aVertexPosition, 1.0);
```

What we're doing here is transforming the normal and vertex position using their respective matrices. These transformations prove essential for lighting calculations among other things.

And there you have it! The mystery behind `modelViewMatrix` and `normalMatrix` solved!

Keep venturing into the exciting realms of coding, you never know what magic you might unravel. Happy Coding! 🚀