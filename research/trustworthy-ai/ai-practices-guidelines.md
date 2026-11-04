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
  - Customer-facing use, such as detecting anger on a call-centre customer's voice (para. 254).
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

