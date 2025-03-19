
import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateInsights = async (data: any[], type: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an AI sports analyst. Analyze the following ${type} data and provide insights.`
        },
        {
          role: "user",
          content: JSON.stringify(data)
        }
      ]
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating insights:', error);
    return 'Unable to generate insights at this time.';
  }
};
