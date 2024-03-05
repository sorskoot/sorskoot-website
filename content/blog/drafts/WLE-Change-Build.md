---
draft: true
---

Switching from esbuild to an npm-based build process in the Wonderland Engine involves several steps, which you'll need to carefully follow to ensure everything is configured correctly. If you're encountering a black screen after packing and running the project, it suggests that there may be a problem with either the bundling process or your project's runtime setup. Here are the steps to switch the build system, along with a checklist of potential issues to consider if you encounter a black screen:

1. **Setup your `package.json`**: As described in the instructions you provided, initialize npm in your project directory (`npm init`) and define your build script in `package.json` to use your preferred bundler.

2. **Install Dependencies**: Ensure that you have installed all the necessary npm packages with `npm install`. This includes the bundler itself (`esbuild`, `webpack`, `rollup`, etc.) and any other JavaScript libraries you intend to use.

3. **Configure Wonderland Project Settings**:
   - Navigate to `Views > Project Settings > JavaScript` in the Wonderland Editor.
   - Change the `bundlingType` to `npm` to use the npm build script.
   - Ensure that the `npmScript` field matches the script name you configured in your `package.json`.

4. **Setup Bundling**:
   - Define the entry point of your application, usually something like `index.js`.
   - Create your bundling script command to properly bundle this entry point into your output file. This should be the path that Wonderland Engine expects based on your project settings.

5. **Create an Entry Point File**:
   - If you haven’t already, create your main JavaScript file (e.g., `index.js`). This file should import and register all necessary components and start your application.

6. **Build your Application**:
   - Run the npm script you set up to generate the bundled JavaScript file.

7. **Pack your Project**:
   - Use the Wonderland Editor to pack and ready your project.

If you end up with a black screen, here's a checklist to help troubleshoot the issue:

- **Bundling Errors**: Check your terminal or command line interface for any errors during the bundling process. There may be issues with missing dependencies or syntax errors.
  
- **Correct Entry Point**: Ensure that your entry point JavaScript file is correctly importing and integrating all the necessary scripts and components.

- **Project Settings**: Double-check the `npmScript` and `bundlingType` settings in the Wonderland Engine project settings to be sure they align with your `package.json`.

- **Console Errors**: Open your browser’s developer console. The console may contain runtime errors that can give clues about what is going wrong.

- **Asset Loading**: Ensure that all assets are correctly being loaded and that there are no 404 errors in the network tab of the developer console.

- **Script Execution**: Verify that the bundled JavaScript is actually executing. Place some `console.log` statements in your entry point to see if the code is being reached.

- **Correct Output Path**: The output file from the npm bundle process must match the expected file path that the Wonderland Engine is trying to load.

If you've checked these and are still experiencing the issue, you may want to run a diff check against any previous versions of your project that worked correctly to see if something has changed or been misconfigured. Additionally, you could consider setting up a minimal project from scratch following the same steps to identify at which point things break.