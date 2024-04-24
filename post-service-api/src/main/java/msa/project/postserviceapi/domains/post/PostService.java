package msa.project.postserviceapi.domains.post;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final KafkaTemplate<String, String> kafkaTemplate;

    public List<Post> findAllPosts() {
        List<Post> result = this.postRepository.findAll();
        List<String> userSeqList = result.stream().map(Post::getUserSeq).distinct().toList();
        requestUserNames(userSeqList);

        return result;
    }

    private void requestUserNames(List<String> userSeqList) {
        String messageContent = String.join(",", userSeqList);

        kafkaTemplate.send("user-name-request", messageContent);
    }

    @KafkaListener(topics = "user-name-response", groupId = "my-user-group")
    private void consumeUserNameResponse(String message) {

    }

}
