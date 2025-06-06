package com.guiuba.api_ai.chat;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

 /*   private final AzureOpenAiChatModel chatModel;

    @Autowired
    public ChatController(AzureOpenAiChatModel chatModel) {
        this.chatModel = chatModel;
    }

    @GetMapping("/ai/generate")
    public Map generate(@RequestParam(value = "message", defaultValue = "Tell me a joke") String message) {
        return Map.of("generation", this.chatModel.call(message));
    }

    @GetMapping("/ai/generateStream")
    public Flux<ChatResponse> generateStream(@RequestParam(value = "message", defaultValue = "Tell me a joke") String message) {
        Prompt prompt = new Prompt(new UserMessage(message));
        return this.chatModel.stream(prompt);
    }*/

/*    private final VertexAiGeminiChatModel chatModel;

    @Autowired
    public ChatController(VertexAiGeminiChatModel chatModel) {
        this.chatModel = chatModel;
    }

    @GetMapping("/ai/generate")
    public Map generate(@RequestParam(value = "message", defaultValue = "Tell me a joke") String message) {
        return Map.of("generation", this.chatModel.call(message));
    }

    @GetMapping("/ai/generateStream")
    public Flux<ChatResponse> generateStream(@RequestParam(value = "message", defaultValue = "Tell me a joke") String message) {
        Prompt prompt = new Prompt(new UserMessage(message));
        return this.chatModel.stream(prompt);
    }*/

        private final ChatClient chatClient;

        public ChatController(ChatClient.Builder chatClientBuilder) {
            this.chatClient = chatClientBuilder.build();
        }

        @PostMapping
        ChatMessage simpleMessage(@RequestBody ChatMessage chatMessage) {
            var response = this.chatClient.prompt()
                    .user(chatMessage.message())
                    .call()
                    .content();
            return new ChatMessage(response);
        }

}
