---
draft: true
---

To load a texture dynamically in Wonderland Engine using code, you typically need to do the following steps:

1. Create an HTML canvas for drawing your texture.
2. Get the `CanvasRenderingContext2D` from the canvas and use its methods to draw your image or graphics.
3. Create a Wonderland Engine `Texture` object, passing in the canvas element.
4. Apply the texture to your material's diffuse or other relevant texture slots.
5. If you update the canvas, call `update()` on the `Texture` object to refresh the texture in the engine.

Below is an example that illustrates the process, which you may adapt according to your needs:

```javascript
import { Component, Property, Texture } from '@wonderlandengine/api';

export class DynamicTextureLoader extends Component {
    start() {
        const canvas = document.createElement('canvas');
        canvas.width = 256; // Set desired width
        canvas.height = 256; // Set desired height
        const ctx = canvas.getContext('2d');

        // Your drawing code here
        // Example: fill the canvas with red color
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Create a Wonderland Engine texture from the canvas
        const dynamicTexture = new Texture(this.engine, canvas);

        // Find the material to which you want to apply the texture
        const material = this.object.getComponent('MeshRenderer').material;

        // Apply the texture to the material's diffuse slot
        material.diffuseTexture = dynamicTexture;

        // If you later update the canvas, refresh the texture
        // ctx... (your drawing updates)
        // Repeat drawing operations as needed
        // After drawing updates:
        dynamicTexture.update(); // Call this to update the texture in Wonderland Engine
    }
}
```

Remember that the specific slot (`diffuseTexture` in the example) might be different depending on your shading model and what the texture represents (e.g., normal map, specular map, etc.).

Additionally, ensure that the material is set up correctly in Wonderland Engine to receive the texture; configure shader properties as needed to display the texture properly on your object.

Please adapt the example code to fit the actual API of Wonderland Engine at the time you're writing your code, as APIs may evolve over time.