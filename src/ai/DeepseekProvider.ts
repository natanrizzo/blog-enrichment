import axios from "axios";
import { IAiProvider } from "./IAiProvider";

export class DeepseekProvider implements IAiProvider {
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async summarizeText(text: string, prompt?: string): Promise<string> {
        prompt = `${prompt ?? "Resuma o seguinte texto. Não inclua qualquer explicação, cumprimentos  ou comentários. Me retorne somente o conteúdo resumido: "} ${text}`;

        const response = await axios.post(
            'https://api.deepseek.com/v1/chat/completions',
            {
                model: "deepseek-chat",
                messages: [{
                    role: "user",
                    content: prompt,
                }],
            },
            {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    "Content-Type": "application/json",
                }
            }
        );
        const choices = response.data.choices;

        if (!choices || choices.length === 0) {
            throw new Error("Deepseek API response malformed: no choices found.");
        }

        return choices[0].message.content.trim();
    }
}