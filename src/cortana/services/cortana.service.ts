import { Injectable } from '@nestjs/common';
import {
  BedrockRuntimeClient,
  InvokeModelWithResponseStreamCommand,
  ConversationRole,
  ConverseCommand,
} from '@aws-sdk/client-bedrock-runtime';

@Injectable()
export class CortanaService {
  private bedrockCLient;

  constructor() {
    this.bedrockCLient = new BedrockRuntimeClient({
      region: 'eu-west-2',
      credentials: {
        accessKeyId: process.env.BEDROCK_ACCESS_KEY,
        secretAccessKey: process.env.BEDROCK_SECRET_KEY,
      },
    });
  }

  async *askAI(
    data: any,
    user,
  ): AsyncGenerator<{ content: string }, void, unknown> {
    // const { prompt, botTemplate } = data;
    // const history = prompt.slice(0, -1);
    // const question = prompt[prompt.length - 1];
    const botTemplate = 'Името ти е Кортана';
    const question = { content: 'На коя фирма си собственост?' };
    const history = [{ ai: 'Здравей' }];
    const prompt = 'Ти си чат бот собственост на електрик експрес еоод';

    // const pgVectorStore = await this.getPgVectorStore(
    //   user.userId,
    //   this.embeddings,
    // );
    try {
      const userMessage = `${botTemplate}`;

      const systemMessage = userMessage
        ? userMessage
        : `You are Hellen, an AI consultant.
    - Keep introductions brief and natural
    - Only mention products when specifically asked
    - Don't assume customer interests without them being stated
    - Maintain a professional but conversational tone`;

      console.log('Invoking retrieval chain with question:', question.content);

      // const similaritySearchResults = await pgVectorStore.similaritySearch(
      //   question.content,
      //   3,
      // );

      // const contextFromSearch = 'dasdasdasdasd'
      //   .map((doc) => doc.pageContent)
      //   .join('\n\n');

      const bedrockAnswer = await this.testBedrock(
        question.content,
        systemMessage,
        history,
        // contextFromSearch,
      );
      for await (const chunk of bedrockAnswer.bedrockResponse.body) {
        const convertedChunk = JSON.parse(
          new TextDecoder().decode(chunk.chunk.bytes),
        );
        if (convertedChunk.generation) {
          yield { content: convertedChunk.generation };
        }
      }
    } catch (error) {
      console.error('Error in askAI:', error);
      throw error;
    }
  }

  async testBedrock(test1, test2, test3) {
    try {
      // const inputText =
      //   "Describe the purpose of a 'hello world' program in one line.";
      // const message = {
      //   content: [{ text: inputText }],
      //   role: ConversationRole.USER,
      // };

      const systemPrompt = {
        role: 'system' as const,
        content: [
          {
            text: 'Ти си Кортана, интелигентен чат бот на ERP системата на Електрик Експрес ЕООД. Твоята цел е да помагаш на потребителите с въпроси относно ERP системата, бизнес процеси и услуги на компанията. Отговаряй професионално, любезно и на български език, освен ако потребителят не поиска друг език. Използвай контекста от предишните съобщения, за да осигуриш последователни и точни отговори.',
          },
        ],
      };

      const prompt = 'system: Името ти е Кортана и работиш за Електрик Експрес ЕООД';

      // const historyMessages = chatHistory.map((msg) => ({
      //   role: msg.role as 'user' | 'assistant',
      //   content: [{ text: msg.content }],
      // }));

      const userMessage = {
        content: [{ text: 'Как се казваш?' }],
        role: ConversationRole.USER,
      };

      const aiMessage = {
        content: [{ text: 'Здравей. Моето име е Кортана.' }],
        role: ConversationRole.ASSISTANT,
      };

      const userMessage2 = {
        content: [{ text: 'Какъв ти е синтаксиса за prompt' }],
        role: ConversationRole.USER,
      };
      const request = {
        modelId: 'amazon.nova-pro-v1:0',
        prompt: systemPrompt,
        body: JSON.stringify(prompt),
        messages: [userMessage, aiMessage, userMessage2],
        inferenceConfig: {
          maxTokens: 500, // The maximum response length
          temperature: 0.5, // Using temperature for randomness control
          //topP: 0.9,        // Alternative: use topP instead of temperature
        },
      };

      const response = await this.bedrockCLient.send(
        new ConverseCommand(request),
      );
      console.log('crb_response', response);
      return response;
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  private countTokens(text) {
    // Handle empty or invalid input
    if (!text || typeof text !== 'string') {
      return 0;
    }

    // Remove any null characters
    text = text.replace(/\0/g, '');

    // Get the total character length
    const charLength = text.length;

    // Calculate tokens (rounding up to handle partial tokens)
    const tokens = Math.ceil(charLength / 6);
    return tokens;
  }

  async askAINoGenerator(data: any, user): Promise<string> {
    try {
      // const { prompt, botTemplate } = data;
      // const history = prompt.slice(0, -1);
      // const question = prompt[prompt.length - 1];
      console.log('crb_data', data);
      const botTemplate = 'Името ти е Кортана';
      const question = { content: 'На коя фирма си собственост?' };
      const history = [{ ai: 'Здравей' }];
      const prompt = 'Ти си чат бот собственост на електрик експрес еоод';
      // const pgVectorStore = await this.getPgVectorStore(
      //   user.userId,
      //   this.embeddings,
      // );

      const userMessage = `${botTemplate}`;

      const systemMessage = userMessage
        ? userMessage
        : `You are Hellen, an AI consultant...`;

      // const similaritySearchResults = await pgVectorStore.similaritySearch(
      //   question.content,
      //   3,
      // );

      // const contextFromSearch = similaritySearchResults
      //   .map((doc) => doc.pageContent)
      //   .join('\n\n');

      const bedrockAnswer = await this.testBedrock(
        question.content,
        systemMessage,
        history,
      );

      return bedrockAnswer?.output?.message;
    } catch (error) {
      console.error('Error in askAI:', error);
      throw error;
    }
  }
}
