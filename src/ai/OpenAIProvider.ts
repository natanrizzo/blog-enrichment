import OpenAI from "openai";
import { IAiProvider } from "./IAiProvider";

export class OpenAIProvider implements IAiProvider {
    private apiKey: string;
    private openAi: OpenAI;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.openAi = new OpenAI({
            apiKey: this.apiKey
        });
    }

    async summarizeText(text: string, prompt?: string): Promise<string> {
        prompt = `${prompt ?? "Resuma o seguinte texto. Não inclua qualquer explicação, cumprimentos  ou comentários. Me retorne somente o conteúdo resumido: "} ${text}`;

        const completion = await this.openAi.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user",
                content: prompt
            }]
        });

        return completion.choices[0].message.content?.trim() ?? "";
    }
}