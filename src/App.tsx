import { useState } from "react"
import { Configuration, OpenAIApi } from "openai"
import { resourceLimits } from "worker_threads"
const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

function App() {
    const [userInput, setUserInput] = useState<string>("")
    const [aiRegexSuggestion, setAiRegexSuggestion] = useState<string>("")

    const getAiGeneration = async () => {
        try {
            const response = await openai.createCompletion({
                model: "text-davinci-002",
                prompt: `Given the following description, output a regex string:\n\n"${userInput}"\n\nRegex:`,
                temperature: 0.7,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0
            })

            if (!response.data.choices?.[0].text) throw new Error("Invalid response")
            setAiRegexSuggestion(response.data.choices?.[0].text)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <textarea
                className=""
                placeholder="Enter regex description"
                onChange={(e) => setUserInput(e.target.value)}
            />
            <button className="" onClick={getAiGeneration}>
                Get regex
            </button>
            <input type="text" value={aiRegexSuggestion} readOnly />
        </>
    )
}

export default App
