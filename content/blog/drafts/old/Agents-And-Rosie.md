---
draft: true
---

In the context of Semantic Kernel, an agent refers to an artificial intelligence (AI) construct that is capable of answering questions and automating processes for the benefit of users. These agents can range in complexity from basic chatbots to fully automated AI assistants, depending on the needs they are designed to fulfill.

Semantic Kernel provides developers with the tools to construct such agents, and it does so by allowing the integration of existing code with AI models. This means that developers can use their existing C#, Python, or Java code - which could represent disparate business logic or functionality - together with AI capabilities to create agents that can interact with users, understand their requests, and execute meaningful actions.

Such agents can be particularly valuable in instances where there is a need to perform tasks that require a combination of understanding natural language input and executing application logic, such as automating customer service processes, managing data, or interacting with complex systems.

The term "agent" in Semantic Kernel encapsulates the AI construct that communicates with human users, leverages AI to understand and process requests, and uses underlying code (through plugins) to perform specific tasks or automate processes. These agents can work either independently, without human intervention, to automate tasks, or semi-autonomously, offering suggestions and recommendations as a "copilot" to a human operator who makes the final decisions.

---
# Difference between Agents, Skills and Plugins: 

In the context of Semantic Kernel, the terms "agents," "skills," and "plugins" each represent different concepts that play a role in building intelligent AI systems. They can be understood as follows:

1. **Agents**:
   - An agent in Semantic Kernel refers to an artificial intelligence entity designed to perform tasks or services for a user. Agents can interact via conversation, answer questions, automate processes, and make decisions based on complex inputs. It might be a chatbot in a customer service scenario or a more complex assistant that orchestrates several tasks.
   - Agents can be seen as the overall application or system that end-users interact with. Agents may leverage multiple skills and plugins to deliver their functionality.

2. **Skills** (not specifically defined in the provided context but generally understood within AI):
   - Skills usually pertain to discrete capabilities or functionalities that an AI or a software service can perform. For instance, a skill could be the ability to book appointments, analyze text, or control smart home devices. 
   - Skills represent the actions that an agent can perform. Each skill is typically executed by one or more plugins, which contain the actual logic needed for that skill.

3. **Plugins**:
   - Plugins are the core building blocks within the Semantic Kernel that enable agents to perform specific tasks. They are modular pieces of code that encapsulate a unit of functionality, which can be called or executed by agents. These plugins can be seen as implementations of skills.
   - They might be plugins that perform API calls (like sending an email or retrieving data), manipulate data (as in calculations or formatting), or interact with AI services and models (to generate natural language text, for example).
   - Plugins are often reusable across different agents. By creating a plugin, a developer can contribute a new capability that any agent can use, as long as the agent is designed to work with that plugin.
   - With Semantic Kernel, plugins can include both native code and requests to AI services via prompts. Additionally, plugins provide metadata that describes their functionality semantically, which is essential for planners to understand how to orchestrate them to fulfill the goals of an agent.

Overall, while the agent represents the AI system interacting with the user and orchestrating the conversation or workflow, plugins provide the granular, specialized functionalities that empower the agent to complete its tasks. Skills, which are not explicitly defined in Semantic Kernel, typically equate to the concept of what the agent can "do" and are closely associated with plugins, which provide the technical means to carry out those skills.

---

# Skills?

In the context of Semantic Kernel (SK), the concept of "skills" does not seem to be explicitly defined based on the information provided. However, we can extrapolate from the details that skills could refer to the abilities or expertise that are built into or required by the various components of SK to perform specific tasks.

Given the architecture of Semantic Kernel outlined above, here's how one might consider "skills" within each of the main concepts:

1. **Kernel** - The skill here would be the orchestration of user requests, expressed as goals, into actionable tasks that the system can execute.

2. **Planner** - This component would require the skill of breaking down high-level goals into sequenced steps and deciding on the proper course of action based upon the available resources (like skills in project management).

3. **Plugins** - The skills here are the domain-specific capabilities provided by the combination of Large Language Model (LLM) AI prompts and native code. These can range from natural language processing to code generation, depending on what the plugins are designed to do.

4. **Memories** - Skills in this context would relate to data management and contextual understanding, enabling the system to maintain and utilize the information relevant to user interactions and system actions.

5. **Connectors** - These components would need the skill to interact with external systems and data sources, such as database querying and API interactions.

In a broader sense and in relation to AI, "skills" could also refer to the different types of prompts or command templates that are defined for use with an LLM. These skill-based prompts would enable the LLM to generate responses or actions across various domains or contexts. Each skill, in this sense, is a piece of expertise encoded within the system that allows it to perform a specific type of task. When a user interacts with the system, they are effectively asking it to execute a skill that meets their current need.