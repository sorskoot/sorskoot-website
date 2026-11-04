---
id: 20261027
draft: true
title: Trustworthy AI
date: 2026-10-27T01:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20261027
permalink: /2026/10/TrustworthyAI/
categories:
  - AI
tags:
  - Responsible AI
images:
  - /images/2026/10/??.png
---

Hello Coders! 👾

Back in March 2024, I wrote about [Responsible AI](/2024/03/ResponsibleAI/). Today, I want to expand on this a bit and focus on AI Governance and Trustworthy AI and what that means for us as software engineers working with AI in a corporate setting. For me, the European legislation is especially interesting. The [EU AI Act](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai) is no longer something coming in the distant future. Parts already apply, while other requirements have later deadlines. And the timeline itself has changed.

How does this influence our daily development work, and what should we consider before shipping an AI feature?

*This post reflects the official EU information available on {{< postdate >}}. It's a practical introduction, not legal advice. The obligations depend on your role, the system, and its intended use.*

## Start With the Purpose

The AI Act takes a risk-based approach. The important question isn't which model you use. It's what the system is used for, who it affects, and what consequences its output can have.

The same model can end up in very different systems. A feature that drafts a job description is a different thing from one that ranks applicants, even when both call the same API. So before looking at any article of the Act, I would describe what the AI actually does. Compliance follows from that description.

This applies to two situations, and they raise different questions.

### The tools we use to build software

Using a coding assistant doesn't automatically make the software we produce an AI system, or make our workflow high-risk. The questions here are mostly about data and control:

- Which model, API, IDE extension, or agent are we using, and who approved it?
- Can it read source code, production logs, customer data, or secrets?
- Can it change files, call business APIs, or deploy software?
- Who can review, override, or stop it?

### The features we ship

Adding an AI feature to our software needs its own assessment, because now the AI is part of what the customer gets. Here I would ask:

- What is the intended purpose of the feature, and who owns it?
- Does its output influence decisions about people?
- Which data does it use, and who can see the result?
- Who can review, override, or stop it?

A short record of the purpose, data flow, and permissions gives our privacy, security, and legal colleagues something concrete to assess. This isn't a claim that every coding assistant needs a formal AI Act compliance dossier. It's a way to avoid discovering an important obligation after the implementation is finished.

## Know Your Role

The Act distinguishes between **providers** and **deployers**. A provider develops an AI system, or has one developed, and places it on the market or puts it into service under its own name. A deployer uses an AI system under its authority in a professional context.

A business using an existing AI assistant, like a coding tool or a chatbot from a vendor, will usually be a deployer. A business that builds its own AI system and puts it into service is a provider. A business can be both, for different systems.

The part that surprises people is that you can be a provider without training a model. If we wrap a model API in our own application and offer it to customers or colleagues, the organization may be providing an AI system, even though it didn't train the model. Buying the model from a large vendor doesn't make that assessment disappear.

The role can also change over time. [Article 25](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-25) covers high-risk systems, where a substantial modification or a new intended purpose can make you the provider. A general-purpose chatbot that we start using to screen job candidates is a good example.

Model vendors have their own role as well. Providers of general-purpose AI models have separate obligations. Those don't automatically transfer to every company that builds on top of their model, and they don't cover everything our application does.

These legal roles belong to the organization, not to every engineer writing the code. Our job is to make the system's purpose and behavior clear enough for the organization to establish its role.

## What Already Applies

Here is the timeline I would keep nearby, based on the Commission's [current overview](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai#1720699867912-1):

| Date | Main milestone |
|---|---|
| 2&nbsp;February&nbsp;2025 | Prohibited AI practices and AI literacy obligations began applying. |
| 2&nbsp;August&nbsp;2025 | Governance rules and obligations for general-purpose AI models began applying, with transition arrangements for some existing models. |
| 27&nbsp;July&nbsp;2026 | The AI Omnibus amendments entered into force. |
| 2&nbsp;August&nbsp;2026 | Most remaining provisions began applying, including Article 50 transparency obligations. Exceptions and transition arrangements still matter. |
| 2&nbsp;December&nbsp;2027&nbsp;&nbsp; | High-risk requirements for Annex III use cases are scheduled to apply. |
| 2&nbsp;August&nbsp;2028 | High-risk requirements for qualifying AI systems connected to regulated products under Annex I are scheduled to apply. |

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

---

Summary for devs of [Guidelines on prohibited artificial intelligence practices](https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-prohibited-artificial-intelligence-ai-practices-defined-ai-act)

## Who is affected

- **Providers and deployers (paras. 11–19).** The prohibitions apply to placing a system on the market, putting it into service, or using it. "Making available" includes API, cloud and download access (para. 12). Building something in-house and using it yourself also counts, and makes you both provider and deployer (paras. 13, 19).
- **Non-EU developers (para. 16).** You are in scope if you place a system on the EU market or if its output is used in the EU.
- **Misuse counts (para. 14).** "Use" includes any misuse that amounts to a prohibited practice, foreseeable or not.
- **Terms of use don't shield the deployer (para. 14).** If an employer uses your emotion-inference tool at work, it is prohibited even though your terms forbid that use.
- **Continuous duty (para. 20).** Compliance is required across the whole lifecycle, with ongoing monitoring and updates.

## What your own code is exempt from

- **Pre-market R&D (paras. 30–31).** Research, testing and development before market placement is excluded. The text says developers may experiment with techniques that "could be seen as manipulative" before shipping.
- **Real-world testing is not excluded (para. 32).** It needs the AI Act's sandbox or real-world testing regime.
- **Open source (para. 36).** There is no exemption for a system that falls under Article 5.
- **General-purpose models (para. 39).** The prohibitions apply to general-purpose systems and to components integrated into other systems.
- **Personal use (paras. 34–35).** Purely personal, non-professional use is excluded for the deployer only. The provider's obligations remain.
- **High-risk systems (paras. 37–38).** A high-risk system can still cross into a prohibited practice, and a system that Article 6(3) takes out of the high-risk class stays subject to Article 5.

## What providers are expected to do (paras. 40–41, 95)

- Don't ship systems that are "reasonably likely" to behave, or be used, in a prohibited way.
- Build in "effective and verifiable" safeguards where misuse is foreseeable and the measures are feasible and proportionate. The examples given are safe and ethical design, technical safeguards, usage restrictions, transparency, user control and clear instructions for use.
- Exclude prohibited uses in your terms of use and give deployers instructions on human oversight.
- Act when you learn of specific misuse, for example through reports or checks on a platform you operate. You are not expected to monitor deployers generally.
- Deployers must not bypass your guardrails.

## The prohibitions with technical examples

**Manipulation and deception, Art. 5(1)(a) (paras. 63–75, 93–96).**
- **Techniques covered.** The ban covers subliminal, purposefully manipulative and deceptive techniques. Examples include hidden or flashed stimuli, "misdirection" and manipulating the user's sense of time to create impatience.
- **Intent isn't required (paras. 69, 73).** A model can learn manipulation or deception from training data, or by gaming RLHF. A system that detects an evaluation and behaves well only while it lasts is called out as potentially prohibited.
- **Incidental behaviour is not covered (para. 69).** It is fine if you took preventive and mitigating measures against likely significant harm.
- **Hallucinations (para. 73).** Occasional false output is probably not a deceptive technique if users are told about the limits and safeguards exist. It is riskier in sensitive contexts such as health, education or elections.
- **Labelling helps (para. 71).** Disclosing that users are talking to AI, and labelling deepfakes, are mitigating measures.
- **Significant harm is required.** Persuasion that is transparent and user-controlled, such as personalised recommendations, is outside the ban (paras. 127–133).
- **Not prohibited (para. 134):**
  - An anthropomorphic companion app that is more engaging but not harmful.
  - Emotion-aware music recommendations.
  - Simulated phishing for security training.

**Exploiting vulnerabilities, Art. 5(1)(b) (paras. 101–112).**
- **Protected groups.** The ban covers vulnerabilities due to age, disability, or a specific social or economic situation.
- **Examples.** An AI toy pushing children into risky challenges, a game with addictive reward loops aimed at children, ads for predatory loans aimed at low-income postcodes, and a therapy chatbot that nudges people with mental disabilities into buying expensive products.
- **Not covered.**
  - A product that is merely inaccessible.
  - Unintended bias from training data (para. 110). If you know the system discriminates and don't correct it, you can be treated as exploiting the vulnerability.
  - Targeting by broad variables such as phone model or city size (para. 111).

**Social scoring, Art. 5(1)(c) (paras. 149–177).**
- **What is banned.** Scoring people over time from social behaviour or personal characteristics, where the result is either:
  - detrimental treatment in an unrelated context, or
  - treatment that is disproportionate.
- **Both sectors.** This applies to private and public actors, and the score can be a number, a ranking or a label.
- **Features to avoid.** The examples are fraud-risk models that use internet connection, nationality or social media behaviour (paras. 166, 168).
- **Allowed if lawful and proportionate (para. 177):**
  - Credit scoring.
  - Transaction-based fraud detection.
  - Telematics insurance.
  - Platform safety profiling.
  - Targeted ads.
  - Shop loyalty privileges.
- **Peer ratings.** User ratings of a driver or host are mere aggregation, not AI scoring (para. 174).

**Individual crime-risk prediction, Art. 5(1)(d) (paras. 199–214).**
- **Banned.** Predicting an individual's offending risk solely from profiling or personality traits.
- **Allowed.** Tools that support human assessment based on objective, verifiable facts linked to a specific crime.
- **Place-based prediction (para. 212).** Predictive policing by area and gunshot detection are out of scope.
- **Private companies (paras. 207–209).** Software built for law enforcement can be caught. Anti-money-laundering screening must use only the data the law specifies.

**Facial image scraping, Art. 5(1)(e) (paras. 224–237).**
- **Scope.** The ban applies to untargeted scraping from the internet or CCTV to build or expand facial recognition databases. A scraper aimed at specific people or groups is not covered (paras. 229–230).
- **Opt-outs don't help (para. 228).** Respecting robots.txt does not make scraping "targeted".
- **No workaround (paras. 230–231).** Building the database step by step with selection criteria each time is treated as untargeted. Mixing targeted and untargeted scraping is still prohibited.
- **Out of scope (paras. 233–236):**
  - Reverse image search of a given face.
  - Voice samples.
  - Face datasets for model training or testing where people aren't identified.
  - Models that generate fictitious faces.

**Emotion recognition, Art. 5(1)(f) (paras. 239–269).**
- **What counts.** Inferring emotions from biometric data (faces, voice, gestures, keystroke dynamics) at work or in education is banned, except for medical or safety purposes.
- **Outside the ban:**
  - Text-only sentiment analysis (para. 251).
  - Physical states such as pain or fatigue, so driver drowsiness detection is fine (para. 249).
  - Detecting that someone is smiling.
  - Customer-facing use, such as detecting anger on a call-centre customer's voice (para. 259).
- **Banned.** Analysing the emotions of call-centre staff, emotional tone in hybrid-work video calls, and recruitment or probation-period use.
- **Other contexts (para. 266).** Emotion recognition outside work and education is high-risk, not banned.

**Biometric categorisation, Art. 5(1)(g) (paras. 270–285).**
- **Banned.** Inferring race, political opinions, union membership, religion or beliefs, or sexual orientation from biometrics. Examples are deducing race from voice and religion from tattoos or faces.
- **Allowed.**
  - Labelling or filtering lawfully acquired datasets (paras. 275, 285).
  - Product-preview or photo filters that are an ancillary feature of another service.
  - Categorising by skin colour for medical diagnosis.
- **Not ancillary.** A system on a social platform that infers political orientation or sexual orientation from photos to target ads is prohibited.

**Real-time remote biometric identification for law enforcement, Art. 5(1)(h) (section 9).**
- **Scope.** This applies to use only, in public spaces, with narrow exceptions. It is mainly relevant if you build such systems for police.
- **Safeguards (section 10).** Fundamental rights impact assessments, registration and prior authorisation are required.

## Penalties and timing (paras. 53–57, 429–431)

- **Fines.** Up to €35 million or 7% of worldwide annual turnover, whichever is higher. The prohibitions are to be "interpreted narrowly".
- **Dates.** The prohibitions have applied since 2 February 2025, and penalties and national authorities since 2 August 2025.
- **Direct effect.** Affected people can already enforce the prohibitions in national courts and seek injunctions.
- **Status.** The guidelines are non-binding and their examples are indicative. Each case needs its own assessment.

---

The first question to ask is whether your feature is an AI system at all. The AI Act only applies to systems that fit the definition in Article 3(1), and the Commission's [guidelines on the AI system definition](https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-ai-system-definition-facilitate-first-ai-acts-rules-application) break that down into seven elements. For us as developers, the most important one is inference: the system derives from its input how to generate outputs such as predictions, content, recommendations, or decisions. Software that only executes rules written by humans doesn't count. That means a database query, a spreadsheet, or a dashboard that only describes data is not an AI system, while a feature built on a machine learning model, such as an LLM that generates content, usually is. There is a gray area in between, including simple statistical predictions and classic heuristics, and the guidelines say each system has to be assessed on its own characteristics. Note that these guidelines are not binding. Only the Court of Justice of the EU can give an authoritative interpretation. And qualifying as an AI system doesn't mean heavy obligations: most AI systems fall outside the prohibited, high-risk, and transparency categories and have no requirements under the Act.