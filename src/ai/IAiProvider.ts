export interface IAiProvider {
    summarizeText(text: string): Promise<string>;
}