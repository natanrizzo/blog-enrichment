import { DeepseekProvider } from "../ai/DeepseekProvider";

export default class AIService {
    private deepseek = new DeepseekProvider(process.env.DEEPSEEK_KEY!);

    async summarizeText(prompt: string) {
        return await this.deepseek.summarizeText(prompt);
    }
}