import { DeepseekProvider } from "../ai/DeepseekProvider";
import { OpenAIProvider } from "../ai/OpenAIProvider";

export default class AIService {
    private deepseek = new DeepseekProvider(process.env.DEEPSEEK_KEY!);
    private openai = new OpenAIProvider(process.env.OPENAI_KEY!);

    async summarizeText(model: string, prompt: string) {
        if (model === "deepseek") {
            return await this.deepseek.summarizeText(prompt);
        } else if (model === "openai") {
            return await this.openai.summarizeText(prompt);
        }
    }
}