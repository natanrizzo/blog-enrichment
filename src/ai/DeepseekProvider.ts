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
        
        return response.data.choises[0].message.content.trim();
    }
}