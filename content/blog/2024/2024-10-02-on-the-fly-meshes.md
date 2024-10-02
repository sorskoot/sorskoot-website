---
id: 20241002
draft: false
title: On The Fly Meshes
date: 2024-10-02T01:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20241002
permalink: /2024/10/ontheflymeshes/
categories:
  - Wonderland Engine
tags:
  - Wonderland Engine
  - Component
images:
  - /images/2024/10/meshes.jpg
---

Hello Coders! 👾

I was working on a project in Wonderland Engine today and wanted to create a mesh at runtime. It's a very powerfull feature, but might seem a bit complicated at first. So, let me walk you through a simple example of creating a mesh. Generating geometry on the fly is incredibly useful for all kinds of effects.

Here’s the code and a breakdown of what it does:

```typescript
import {
    Component,
    Material,
    MeshAttribute,
    MeshComponent,
    MeshIndexType,
} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';

export class OnTheFlyMeshTest extends Component {
    static TypeName = 'on-the-fly-mesh-test';

    @property.material()
    material?: Material;
    
    private _meshComp: MeshComponent;

    start() {
        this._meshComp = this.object.addComponent(MeshComponent);

        const vertexCount = 4;
        const indexData = new Uint16Array([0, 1, 2, 1, 3, 2]);

        const mesh = this.engine.meshes.create({
            indexData,
            vertexCount,
            indexType: MeshIndexType.UnsignedInt,
        });

        const positions = mesh.attribute(MeshAttribute.Position);
        if (positions) {
            positions.set(0, [-0.5, -0.5, 0.0]);
            positions.set(1, [0.5, -0.5, 0.0]);
            positions.set(2, [-0.5, 0.5, 0.0]);
            positions.set(3, [0.5, 0.5, 0.0]);
        }

        const texCoords = mesh.attribute(MeshAttribute.TextureCoordinate);
        if (texCoords) {
            texCoords.set(0, [0.0, 0.0]);
            texCoords.set(1, [1.0, 0.0]);
            texCoords.set(2, [0.0, 1.0]);
            texCoords.set(3, [1.0, 1.0]);
        }

        const normals = mesh.attribute(MeshAttribute.Normal);
        if (normals) {
            normals.set(0, [0.0, 0.0, 1.0]);
            normals.set(1, [0.0, 0.0, 1.0]);
            normals.set(2, [0.0, 0.0, 1.0]);
            normals.set(3, [0.0, 0.0, 1.0]);
        }

        mesh.update();

        this._meshComp.mesh = mesh;
        this._meshComp.material = this.material;
    }
}
```

### Step-by-Step Breakdown

Let's review the code in the `start` method, since the rest is just there for completeness.

1. **Add a Mesh Component**:
   We start by adding a `MeshComponent` to the object.

   ```typescript
   this._meshComp = this.object.addComponent(MeshComponent);
   ```

2. **Define Vertex and Index Data**:
   We specify our vertex count and index data, which tells the engine how vertices are connected to form triangles.

   ```typescript
   const vertexCount = 4;
   const indexData = new Uint16Array([0, 1, 2, 1, 3, 2]);
   ```

3. **Create Mesh**:
   Using the defined vertex and index data, we create the mesh.

   ```typescript
   const mesh = this.engine.meshes.create({
       indexData,
       vertexCount,
       indexType: MeshIndexType.UnsignedInt,
   });
   ```

4. **Set Mesh Attributes**:
   - **Positions**: We define the positions of our vertices.

     ```typescript
     const positions = mesh.attribute(MeshAttribute.Position);
     if (positions) {
         positions.set(0, [-0.5, -0.5, 0.0]);
         positions.set(1, [0.5, -0.5, 0.0]);
         positions.set(2, [-0.5, 0.5, 0.0]);
         positions.set(3, [0.5, 0.5, 0.0]);
     }
     ```

   - **Texture Coordinates**: We set the texture coordinates for our vertices.

     ```typescript
     const texCoords = mesh.attribute(MeshAttribute.TextureCoordinate);
     if (texCoords) {
         texCoords.set(0, [0.0, 0.0]);
         texCoords.set(1, [1.0, 0.0]);
         texCoords.set(2, [0.0, 1.0]);
         texCoords.set(3, [1.0, 1.0]);
     }
     ```

   - **Normals**: We define the normals for our vertices, which are necessary for lighting calculations.

     ```typescript
     const normals = mesh.attribute(MeshAttribute.Normal);
     if (normals) {
         normals.set(0, [0.0, 0.0, 1.0]);
         normals.set(1, [0.0, 0.0, 1.0]);
         normals.set(2, [0.0, 0.0, 1.0]);
         normals.set(3, [0.0, 0.0, 1.0]);
     }
     ```

5. **Update the Mesh**:
   After modifying the attributes, we tell the engine to update the vertex data on the GPU.

   ```typescript
   mesh.update();
   ```

6. **Apply Mesh and Material**:
   Finally, we apply the created mesh and material to our mesh component.

   ```typescript
   this._meshComp.mesh = mesh;
   this._meshComp.material = this.material;
   ```

That's it! By following these steps, you can dynamically create and modify meshes in Wonderland Engine. This opens up a lot of possibilities for real-time content generation in your WebXR and 3D web projects.

Happy Coding! 🚀

{{< img-link "/images/2024/10/meshes.jpg" "Meshes" >}}
