---
id: 20250722
draft: true
title: Tightpackedshader
date: 2025-07-22T01:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20250722
permalink: /2025/07/tightpackedshader/
categories:
  - Shaders
tags:
  - GLSL
  - Optimization
  - Graphics Programming
images:
  - /images/2025/07/??.png
---

## NOTE TO SELF

Wonderland uses:

- lowp is 1 byte
- mediump is 2 bytes
- highp is 4 bytes

This is per component. So a `mediump vec3` is 6 bytes

and you ~~want~~ need  to fill it to 8.

a mat3 or mat4 is not supported as parameter in a struct in WLE.
But technically it would be when `mediump mat3` = 3x3 x 2 bytes = 18 bytes.

### Text Below is incorrect

---

Hello Coders! 👾

If you've ever worked with shaders, you might have encountered the error:

```
Material in shader SomeVeryNiceShader cannot be tightly packed, because of misaligned parameter direction. Re-order the struct fields from large to small to avoid padding.
```

This error can be confusing. I'll explain what it means and how to fix it.

## What Does "Tightly Packed" Mean?

In shaders, memory alignment is crucial for performance. GPUs are optimized to access memory in specific ways, and when data isn't aligned properly, extra padding is added. This padding wastes memory and can slow things down. A "tightly packed" structure means that the data is arranged in memory without unnecessary padding.

## Why Does This Error Happen?

The error occurs because the fields in your `struct` are not ordered in a way that minimizes padding. GPUs align data based on the size of the largest field. For example:

```glsl
struct Material {
    lowp float exposure;       // 4 bytes
    mediump vec3 direction;    // 12 bytes
    mediump vec3 centerPosition; // 12 bytes
};
```

Here, `exposure` is a `float` (4 bytes), but `vec3` fields like `direction` and `centerPosition` require 16-byte alignment. This misalignment forces the GPU to add padding after `exposure`, wasting memory.

## What Are `mediump`, `lowp`, and `highp`?

Think of these as different quality settings for numbers, like choosing between a low-resolution image and a high-resolution one:

lowp (Low Precision):

Range: It can only store very small numbers, generally between -2 and 2 for "floating point" (numbers with decimal places) and between -256 and 256 for "integers" (whole numbers).
Precision: It's not very accurate with decimal places. If you have a number like 0.12345, lowp might round it to something like 0.12.
When to use: This is used when you don't need super-accurate numbers or a wide range of values. It's faster and uses less memory, which is great for mobile devices or simple calculations where a little inaccuracy won't matter much (e.g., some basic color components).
mediump (Medium Precision):

Range: It can store a moderate range of numbers, up to about -16,384 to 16,384 for floating points, and -1,024 to 1,024 for integers.
Precision: It offers better accuracy with decimal places than lowp. The error is "relative," meaning the bigger the number, the larger the potential error, but it's still a small percentage.
When to use: This is a good balance between performance and quality. It's often used for things like texture coordinates or positions that don't need extreme precision but are beyond the capabilities of lowp.
highp (High Precision):

Range: It can store a very large range of numbers, up to incredibly huge values (like 2 to the power of 62) for both floating points and integers.
Precision: This is the most accurate. It can store numbers with many decimal places with very little error.
When to use: You use highp for calculations that require extreme accuracy and a wide range of values, like precise 3D object positions, complex lighting calculations, or anything where tiny errors could cause visible glitches. It uses more memory and can be slower than lowp or mediump.
In Summary:

These qualifiers (lowp, mediump, highp) are like different measuring tapes:

lowp is a short, rough tape measure (small range, low accuracy).
mediump is a longer, more detailed tape measure (moderate range, better accuracy).
highp is a very long, highly precise laser measuring tool (huge range, very high accuracy).
The idea is to pick the lowest precision (and thus the fastest and least memory-intensive) option that still gives you the visual quality you need. The computer is required to meet at least these minimums, but it can use higher precision if it's more efficient for its hardware.

### Do They Affect Padding?

Yes, precision qualifiers can influence padding. The GPU aligns data based on the size of the largest field in a `struct`. For example:

```glsl
struct Material {
    lowp float exposure;       // 4 bytes
    mediump vec3 direction;    // 12 bytes
    mediump vec3 centerPosition; // 12 bytes
};
```

Here, `mediump vec3` requires 16-byte alignment, even though `lowp float` is only 4 bytes. This misalignment causes padding to be added. However, changing the precision (e.g., using `lowp vec3`) won't reduce the alignment requirement for `vec3`. The alignment is determined by the type (`vec3`), not the precision.

### When to Use Each Precision?

- Use `lowp` for colors or non-critical values.
- Use `mediump` for most calculations, like normals or directions.
- Use `highp` for positions or calculations requiring high accuracy.

By choosing the right precision, you can optimize performance without affecting padding.

## Common GLSL Types and Their Sizes

To better understand alignment and padding, here's a table of common GLSL types and their sizes in bytes:

| Type           | Size (Bytes) | Alignment (Bytes) |
|----------------|--------------|-------------------|
| `float`        | 4            | 4                 |
| `vec2`         | 8            | 8                 |
| `vec3`         | 12           | 16                |
| `vec4`         | 16           | 16                |
| `int`          | 4            | 4                 |
| `ivec2`        | 8            | 8                 |
| `ivec3`        | 12           | 16                |
| `ivec4`        | 16           | 16                |
| `mat2`         | 32           | 8 (per column)    |
| `mat3`         | 48           | 16 (per column)   |
| `mat4`         | 64           | 16 (per column)   |

### What Do "Size" and "Alignment" Mean?

- **Size:** This is the actual memory required to store the data. For example, a `vec3` requires 12 bytes (3 components, each 4 bytes).
- **Alignment:** This is the memory boundary where the data must start. For example, a `vec3` must start at a 16-byte boundary, even though its size is only 12 bytes.

### Why Is `vec3` Alignment 16 Bytes?

The GPU aligns `vec3` to 16 bytes to match the alignment of `vec4`. This simplifies memory access for the GPU, as it can treat `vec3` and `vec4` uniformly. However, this means that the remaining 4 bytes in the 16-byte block are unused, creating padding.

### Do I Need to "Fill" the Padding?

No, you don't need to explicitly fill the padding. The GPU automatically handles it. However, if you're designing a `struct`, you can avoid wasting memory by reordering fields. For example:

```glsl
struct Material {
    mediump vec3 direction;    // 12 bytes, aligned to 16 bytes
    lowp float exposure;       // 4 bytes
};
```

Here, `direction` takes 16 bytes due to alignment, and `exposure` fits into the remaining 4 bytes of the 16-byte block. This eliminates extra padding.

### Example of Misaligned vs. Aligned `struct`

#### Misaligned `struct` (Wastes Memory)

```glsl
struct Material {
    lowp float exposure;       // 4 bytes
    mediump vec3 direction;    // 12 bytes, aligned to 16 bytes
};
```

- `exposure` takes 4 bytes.
- 12 bytes of padding are added to align `direction` to 16 bytes.
- Total size: 32 bytes.

#### Aligned `struct` (No Wasted Memory)

```glsl
struct Material {
    mediump vec3 direction;    // 12 bytes, aligned to 16 bytes
    lowp float exposure;       // 4 bytes
};
```

- `direction` takes 16 bytes (12 bytes + 4 bytes padding).
- `exposure` fits into the remaining 4 bytes.
- Total size: 16 bytes.

By reordering fields, you can tightly pack the data and avoid unnecessary padding.

## How to Fix It?

To fix this, reorder the fields in your `struct` from largest to smallest. This ensures proper alignment and eliminates unnecessary padding:

```glsl
struct Material {
    mediump vec3 direction;    // 12 bytes
    mediump vec3 centerPosition; // 12 bytes
    lowp float exposure;       // 4 bytes
};
```

By placing the larger fields first, the GPU can tightly pack the data without adding padding.

## What Is Alignment and Why Is Padding Added?

Alignment refers to how data is arranged in memory to ensure efficient access by the GPU. GPUs are designed to read memory in chunks, often referred to as "blocks." These blocks are typically 4, 8, or 16 bytes in size, depending on the type of data being accessed. Proper alignment ensures that data fits neatly into these blocks, allowing the GPU to read it in a single operation.

### Why Does Padding Happen?

Padding is added when the size of a field in a `struct` doesn't align with the memory block size required by the GPU. This happens because the GPU needs to maintain alignment for efficient memory access. Let's break it down:

1. **Memory Blocks:** The GPU reads memory in blocks of 4, 8, or 16 bytes. For example:
   - A `float` (4 bytes) fits into a 4-byte block.
   - A `vec3` (12 bytes) requires a 16-byte block because the GPU aligns it to the next power of 2 (16 bytes).

2. **Mixed Sizes in a `struct`:** When a `struct` contains fields of different sizes (e.g., 4 bytes for a `float` and 12 bytes for a `vec3`), the GPU adds padding to ensure that each field starts at the correct alignment boundary.

### Example: Why Padding Is Added

Consider this `struct`:

```glsl
struct Material {
    lowp float exposure;       // 4 bytes
    mediump vec3 direction;    // 12 bytes
};
```

- `exposure` (4 bytes) fits into a 4-byte block.
- `direction` (12 bytes) requires a 16-byte block for alignment. Since `exposure` only uses 4 bytes, the GPU adds 12 bytes of padding to align `direction` to the next 16-byte boundary.

This results in wasted memory because of the padding.

### How Does the GPU Handle Alignment?

The GPU aligns fields based on their type, not their size. For example:

- A `vec3` (12 bytes) is aligned to 16 bytes because the GPU treats it like a `vec4` (16 bytes) for simplicity.
- A `float` (4 bytes) is aligned to 4 bytes.

The alignment ensures that the GPU can access memory efficiently, even if it means adding padding.

### Do Memory Blocks Depend on the `struct`?

No, memory blocks are determined by the GPU's architecture and the type of data being accessed. The `struct` layout only determines how fields are arranged within those blocks. By reordering fields, you can minimize padding and make better use of the available memory.

### Optimized `struct` Layout

To avoid padding, always order fields from largest to smallest:

```glsl
struct Material {
    mediump vec3 direction;    // 12 bytes, aligned to 16 bytes
    lowp float exposure;       // 4 bytes
};
```

Here:

- `direction` takes 16 bytes (12 bytes + 4 bytes padding).
- `exposure` fits into the remaining 4 bytes of the 16-byte block.

This layout eliminates unnecessary padding and reduces the total size of the `struct`.

### Key Takeaways About Alignment

- GPUs read memory in blocks (e.g., 4, 8, or 16 bytes).
- Alignment ensures that fields start at boundaries matching their required block size.
- Padding is added when fields are misaligned to maintain proper boundaries.
- Reordering fields in a `struct` can minimize padding and optimize memory usage.

Understanding alignment and padding helps you design efficient `struct` layouts for shaders, improving both performance and memory usage.

## Key Takeaways

- Always order `struct` fields from largest to smallest.
- Use tools like [RenderDoc](https://renderdoc.org/) or your graphics debugger to inspect memory layouts.
- Proper alignment improves performance and reduces memory usage.
- Precision qualifiers (`lowp`, `mediump`, `highp`) define the range and accuracy of variables.
- Padding is influenced by the type (e.g., `vec3`), not the precision.
- Proper alignment and precision choices improve performance and memory usage.

I hope this clears up the mystery behind "tightly packed" properties in shaders. If you have any questions or tips of your own, feel free to share them in the comments!

Happy Coding! 🚀
