---
draft: true
---

Another thing I like to fine-tune into an llm is my writing style from my blog. I have a lot of blogs that are in the correct style. How can I get that into a training set? Do I have literal right and wrong comparisons?

Fine-tuning an LLM with your writing style is a way of personalizing the model to generate text that matches your tone, voice, and preferences. For example, you may want to fine-tune an LLM to write blog posts that are humorous, informative, or persuasive.

To fine-tune an LLM with your writing style, you need to prepare a dataset of your blog posts that represent your style. You can use your existing blog posts as the source of data, or you can create new ones. You do not need to have literal right and wrong comparisons, but you need to have enough examples to cover the diversity and nuances of your style.

Here are some steps that you can follow to create a dataset for fine-tuning an LLM with your writing style:

- Collect your blog posts that you want to use as the data source. You can use tools such as [Beautiful Soup](^1^) or [Scrapy](^2^) to scrape your blog posts from your website, or you can manually download them as text files.
- Preprocess your blog posts to remove any irrelevant or noisy information, such as HTML tags, links, images, or comments. You can use tools such as [NLTK](^3^) or [spaCy](^4^) to perform text cleaning and normalization.
- Format your blog posts as input-output pairs for the LLM. You can use a prompt template library, such as [PromptSource](^5^) or [PromptKit](^6^), to create prompts that specify the input and output format for the LLM. For example, you can use a prompt like this:

```
Write a blog post about {topic} in the style of {author}.
```

The input would be the topic and the author name, and the output would be the blog post text. You can also use other formats, such as summaries, titles, or keywords, as the input or output.

- Split your dataset into train, validation, and test sets. You can use tools such as [scikit-learn](^7^) or [PyTorch](^8^) to perform the split. You should use the train set for fine-tuning the LLM, the validation set for monitoring the fine-tuning progress and tuning the hyperparameters, and the test set for evaluating the fine-tuned LLM.

I hope this helps you create a dataset for fine-tuning an LLM with your writing style. If you have any more questions, feel free to ask me. 😊

Source: Conversation with Bing, 2/14/2024
(1) The Ultimate Guide to LLM Fine Tuning: Best Practices & Tools. https://www.lakera.ai/blog/llm-fine-tuning-guide.
(2) A Pro’s Guide to Finetuning LLMs - Medium. https://medium.com/@dave-shap/a-pros-guide-to-finetuning-llms-c6eb570001d3.
(3) Mastering the Art of LLM Fine-Tuning | by S Shakir | Medium. https://medium.com/@S.Shakir/mastering-the-art-of-llm-fine-tuning-3dbc45cd864c.
(4) Fine-Tuning: Advanced Techniques for LLMs Optimization. https://medium.com/@bijit211987/fine-tuning-advanced-techniques-for-llms-optimization-3c09993909ce.
(5) undefined. https://youtu.be/cOz3QJT1zU8.
(6) undefined. https://github.com/daveshap/MovieScriptGenerator.
(7) undefined. https://github.com/daveshap/GPT3_Finetunes.
(8) undefined. https://medium.com/@dave-shap/become-a-gpt-prompt-maestro-943986a93b81.

So I can just run through the markdown files of my blog. Clean it up a bit, removing images, headers etc, maybe the last paragraph that thanks for reading and then create jsonl like `{"prompt":"Write a blog post about {topic} in the style of {author}","message":"{part of the blogpost}"}` where I replace {topic} with the title of the post, {author} with my name and {part of the blogpos} with a paragraph of my blogpost. And then use that as a dataset to finetune an llm like gpt3?

Yes, that is one possible way to create a dataset for fine-tuning an LLM with your writing style. You can also use other formats or tools to create your dataset, as long as you have enough examples of your style. You can then use the dataset to fine-tune an LLM like GPT-3 or any other suitable model. 😊

If I have trained it, can I use it for slightly different purposes? Like providing it with a paragraph of text and have it change it to my style?

Yes, you can use a fine-tuned LLM for slightly different purposes, as long as they are related to the original task or domain. For example, if you fine-tune an LLM to write blog posts in your style, you can also use it to rewrite or edit existing paragraphs of text in your style. This is called **style transfer**, and it is a common application of fine-tuned LLMs.

Style transfer is the process of transforming the style of a text while preserving its content. For example, you can change the tone, voice, mood, or personality of a text using style transfer. You can use a fine-tuned LLM to perform style transfer by providing it with a prompt that specifies the input text and the desired style. For example, you can use a prompt like this:

```
Rewrite the following paragraph in the style of {author}:

{input paragraph}
```

The LLM will then generate a new paragraph that has the same content as the input paragraph, but with the style of the author. You can also use other formats or tools to perform style transfer, such as [Styleformer](^1^) or [TextFlint](^2^).

I hope this helps you understand how to use a fine-tuned LLM for style transfer. If you have any more questions, feel free to ask me. 😊

Source: Conversation with Bing, 2/14/2024
(1) The Ultimate Guide to LLM Fine Tuning: Best Practices & Tools. https://www.lakera.ai/blog/llm-fine-tuning-guide.
(2) Guide to Fine-Tuning Techniques for LLMs | Symbl.ai. https://symbl.ai/developers/blog/guide-to-fine-tuning-techniques-for-llms/.
(3) A Pro’s Guide to Finetuning LLMs - Medium. https://medium.com/@dave-shap/a-pros-guide-to-finetuning-llms-c6eb570001d3.
(4) aws-samples/fine-tuning-llm-with-domain-knowledge. https://github.com/aws-samples/fine-tuning-llm-with-domain-knowledge.


---
Markdown parser
https://khalidabuhakmeh.com/parse-markdown-front-matter-with-csharp