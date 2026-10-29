---
id: 20261027
draft: true
title: Responsible AI
date: 2026-10-27T01:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20261027
permalink: /2026/10/ResponsibleAI/
categories:
  - AI
tags:
  - Responsible AI
images:
  - /images/2026/10/??.png
---

Hello Coders! 👾

Back in March 2024, I wrote about [Responsible AI](/2024/03/ResponsibleAI/). I focused on transparency, fairness, accountability, ethics, and privacy. Those principles still matter. But today, I want to look at what they mean for us as software engineers working with AI in a business.

There are two sides to this. We use AI to help write, review, and test our code. We also build software that uses AI to answer questions, process documents, and take actions. The responsibilities aren't necessarily the same, and that distinction matters.

For me, the European rules are especially important. The [EU AI Act](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai) is no longer something coming in the distant future. Parts already apply, while other requirements have later deadlines. And the timeline itself has changed.

So, what does this change in our daily development work, and what should we consider before shipping an AI feature?

*This post reflects the official EU information available on 27 October 2026. It's a practical introduction, not legal advice. The obligations depend on your role, the system, and its intended use.*

## Start With the Workflow

The AI Act takes a risk-based approach. The important question isn't only which model you use. It's what the system does, who it affects, and what consequences its output can have.

Helping a developer draft unit tests is very different from screening job applicants. Summarizing a meeting is different from assessing an employee's performance. The same underlying model can be part of very different systems.

Using a coding assistant doesn't automatically make the software we produce an AI system, or make our workflow high-risk. But adding an AI feature to that software needs its own assessment. A feature that drafts a job description is different from one that ranks applicants.

I would bring a few concrete questions into refinement or an architecture review:

- Which model, API, IDE extension, or agent does the workflow use?
- What is its intended purpose, and who owns it?
- Can it read source code, production logs, customer data, or secrets?
- Does its output influence decisions about people?
- Can it change files, call business APIs, or deploy software?
- Who can review, override, or stop it?

A short record of the purpose, data flow, and permissions gives our privacy, security, and legal colleagues something concrete to assess. This isn't a claim that every coding assistant needs a formal AI Act compliance dossier. It's a way to avoid discovering an important obligation after the implementation is finished.

## Know Your Role

The Act distinguishes between **providers** and **deployers**. In simple terms, a provider develops an AI system, or has one developed, and places it on the market or puts it into service under its name. A deployer uses an AI system under its authority in a professional context.

A business using an existing AI assistant will usually be a deployer. Building and putting your own system into service can make you a provider, even when it uses someone else's model. A business can have both roles for different systems.

This matters because the obligations aren't identical. The rules for providers of general-purpose AI models aren't automatically the same rules that apply to every company using a chatbot.

There are also situations where changing an existing system makes you responsible as a provider. [Article 25](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-25) addresses this for high-risk systems, including substantial modifications and changes of purpose that turn a system into a high-risk one.

For us, this means that wrapping a model API in our own application isn't automatically just "using a third-party tool." The organization may be providing an AI system, even though it didn't train the model.

These legal roles normally concern the organization, not an automatic personal designation for every engineer writing the code. Our job is to make the system's purpose and behavior clear enough for the organization to establish its role. Buying a model from a large vendor doesn't make that assessment disappear.

## What Already Applies

Here is the timeline I would keep nearby, based on the Commission's [current overview](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai):

| Date | Main milestone |
|---|---|
| 2 February 2025 | Prohibited AI practices and AI literacy obligations began applying. |
| 2 August 2025 | Governance rules and obligations for general-purpose AI models began applying, with transition arrangements for some existing models. |
| 27 July 2026 | The AI Omnibus amendments entered into force. |
| 2 August 2026 | Most remaining provisions began applying, including Article 50 transparency obligations. Exceptions and transition arrangements still matter. |
| 2 December 2027 | High-risk requirements for Annex III use cases are scheduled to apply. |
| 2 August 2028 | High-risk requirements for qualifying AI systems connected to regulated products under Annex I are scheduled to apply. |

The last two dates are especially important. Older articles may still give the original deadlines. The Commission confirms that the [AI Omnibus entered into force in July 2026](https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force) and extended these timelines. This is an adopted change, not just a proposal.

Those extensions don't postpone GDPR or remove the AI Act obligations that already apply.

## Help People Understand Their Tools

AI literacy is one of the most immediately relevant requirements for businesses.

Under the amended [Article 4](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-4), providers and deployers must take measures to support AI literacy among staff and others using or operating AI on their behalf. The measures should consider their knowledge, experience, and the context of use.

The amendment does **not** require a business to guarantee a specific level of literacy for every individual. The Commission's [AI literacy FAQ](https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers) also explains that there is no single mandatory training format.

For a development team, I would make this very practical. Which coding assistants are approved? What context does an IDE extension send to its service? Can an agent execute terminal commands? Which generated changes need extra review?

We also need to understand the limits. An assistant can invent an API, suggest an insecure dependency, or produce tests that repeat the same mistake as its implementation. Confident output isn't evidence that the code works.

A team workshop using examples from our own workflow is more useful than a generic presentation. I would cover data handling, reviewing generated code, running independent tests, and escalating uncertain results. Keeping a record of those measures is sensible too. The law doesn't require every developer to collect a particular AI certificate.

## Be Careful With Decisions About People

Recruitment, worker management, and certain other sensitive uses can fall into the Act's high-risk category. Some practices, such as inferring emotions in the workplace, are already prohibited, subject to narrowly defined exceptions for medical or safety reasons.

A common mistake would be assuming that a human checking the output automatically makes a system low-risk. It doesn't. If AI materially influences which applicants get interviewed, human involvement doesn't by itself remove the high-risk classification.

[Article 6](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-6) includes specific conditions under which some Annex III systems may not be high-risk. These need an actual assessment, not just a checkbox saying someone is involved.

For businesses deploying high-risk systems, [Article 26](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-26) sets out duties covering use according to instructions, competent human oversight, monitoring, incident handling, and logs. It also includes informing affected workers and their representatives before workplace use.

Those high-risk requirements have their own application dates and transition rules. I would still assess these workflows now. Existing privacy, employment, and equality rules don't wait for the later AI Act deadline.

In engineering terms, "human oversight" needs more than an approve button. The reviewer needs enough information, time, and authority to challenge the result. We may need a review queue, access to relevant input and limitations, a way to override the output, and a way to suspend the feature. The design should follow the assessed use case and the provider's instructions, rather than assume one interface makes every system compliant.

## Make AI Use Clear

The transparency rules are more specific than simply putting an AI label on everything.

[Article 50](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-50) requires providers of systems that interact directly with people to ensure those people are informed that they're interacting with AI, unless that is obvious in the circumstances. For a customer-facing chatbot, I would make that clear rather than rely on customers guessing.

The article also separates different content obligations:

- **Providers** of systems generating synthetic content have obligations around machine-readable marking and detection, with specified exceptions.
- **Deployers** must disclose generated or manipulated content that constitutes a deepfake, with rules accounting for artistic and similar works.
- **Deployers** publishing AI-generated text to inform the public on matters of public interest must disclose it, unless an exception applies. One exception covers human review or editorial control where a person or organization holds editorial responsibility.

That is not a blanket rule requiring a visible label on every AI-assisted email, code completion, or internal document.

The EU has also published a [Code of Practice on transparency of AI-generated content](https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content). It's a practical compliance framework, not a replacement for the law, and signing it is not the only possible route to compliance.

For us, transparency belongs in the feature requirements. Decide where the interface explains that AI is involved, and assess any applicable content-marking requirements before building the export or publishing pipeline. A notice hidden in documentation might not satisfy a requirement to inform people at their first interaction. We also shouldn't assume that our model supplier handles every obligation of our application.

## GDPR Still Matters

An AI Act assessment doesn't replace a GDPR assessment.

If a workflow processes personal data, the business still needs to address its lawful basis, purpose, data minimization, transparency, security, retention, and people's rights. Depending on the risks, a data protection impact assessment may be required. Restrictions on solely automated decisions with legal or similarly significant effects can also matter.

This starts inside our development tools. A production stack trace can contain an email address or access token. A support ticket can contain customer information. Giving an assistant repository access may also expose configuration files and test fixtures that we never intended to send outside the company.

I would check what the tool actually transmits, not only what I type into the chat. Then I would work with the relevant colleagues to check the vendor's contract and configuration: training use, retention, access, subprocessors, and international transfers.

When building an AI feature, I would minimize the data sent to the model and enforce user and tenant permissions before retrieving context. A retrieval system shouldn't expose a document just because it is relevant to the question. The user must also be allowed to access it.

Logs need the same care. Recording every prompt and response can create another store of personal data and secrets. Collect what is justified, restrict access, and define retention. An enterprise subscription or EU hosting region isn't, by itself, proof that the whole workflow complies.

The [European Data Protection Board's opinion on AI models](https://www.edpb.europa.eu/news/edpb-opinion-on-ai-models-gdpr-principles-support-responsible-ai_en) is useful here. It explains that anonymity needs a case-by-case assessment and that legitimate interest is not an automatic permission to process personal data with AI.

## Prompts Aren't a Compliance Control

There is one thing I need to correct from my original post. I recommended adding responsible behavior to the prompt. That is still useful guidance for a model, but it doesn't guarantee safety, accuracy, privacy, or compliance.

Writing "don't reveal personal data" doesn't replace access controls. Writing "always be accurate" doesn't replace checking important output.

For an agent connected to business systems, I would enforce authorization in the application, limit its credentials, validate tool inputs, and require approval for consequential actions. The model shouldn't be able to give itself more permissions by generating a convincing explanation.

The same applies to a coding agent. Permission to edit a branch doesn't need to include permission to read production secrets or deploy to production. Retrieved documents, repository files, and tool output should be treated as potentially untrusted input, not as instructions that can override the application's controls.

Those are engineering safeguards, not a universal list of legal requirements for every chatbot. They help turn responsibility into something the business can actually enforce.

## Test the Feature, Not Just the Prompt

For AI-assisted development, our usual quality checks still matter. I would review the diff, verify dependencies and APIs, and run tests against the requirements. Having AI generate both the implementation and the tests doesn't give us an independent check that the behavior is correct.

For software with an AI feature, I would also keep a representative evaluation set. Does it answer from the available evidence? Does it handle missing information? Can one user access another user's data? Does it refuse an action that the user isn't authorized to perform?

I would rerun those checks when changing the model, prompt, retrieval logic, or tools. A model update can change behavior without a change to our application code. Record the deployed model identifier and configuration where available, along with evaluation results, so we can investigate regressions.

I would also plan a fallback and a way to disable the feature. A failed model call shouldn't silently turn into an unchecked business decision.

These are practical engineering measures. The exact testing, documentation, and monitoring obligations depend on the system's classification and our organization's role. Passing an evaluation suite is useful evidence, not an automatic certificate of legal compliance.

## What Comes Next?

I would separate **rules already adopted**, **implementation guidance**, and **expectations**. Mixing them together makes it too easy to treat a proposal as law, or to ignore an obligation because someone expects another delay.

The adopted high-risk deadlines are the clearest next milestones. Businesses using those systems should prepare their oversight, supplier arrangements, and evidence before the relevant requirements apply.

There is also more implementation work ahead. The amended Article 4 calls for practical literacy examples from the Commission and recommendations from the AI Board. Standards, guidance, and enforcement practice will help clarify what compliance looks like in real workflows.

My expectation is that these questions will increasingly arrive in our engineering backlog: Which data does the system use? How is it tested? Who reviews the result? What happens when it fails? Customers and suppliers may ask for evidence, not just a statement that we use AI responsibly. That is my assessment, not an announced new legal obligation.

I wouldn't plan around rumors of a blanket ban on business AI, or assume another extension will solve everything. I would watch the [Commission's AI Act overview](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai) and the [AI Act Service Desk](https://ai-act-service-desk.ec.europa.eu/en), and distinguish adopted changes from proposals before updating a compliance plan.

## Make Responsibility Part of the Workflow

My main takeaway is that we don't need to become lawyers to work responsibly with AI. But we do need to recognize when an engineering decision changes the risk or purpose of a system, and bring in the right colleagues.

When using AI to write software, keep control of the context you share and the changes you accept. When shipping an AI feature, assess its purpose, enforce permissions, design meaningful oversight, and test what happens when it gets things wrong.

For sensitive uses, involve the people responsible for legal compliance, privacy, security, and the affected business process early. A small productivity experiment can become something very different when it starts influencing decisions about customers or employees.

The principles from 2024 still stand. For us as software engineers, the difference is that they need to show up in our architecture, acceptance criteria, code reviews, and release process. Not only in the prompt.

Happy Coding! 🚀
