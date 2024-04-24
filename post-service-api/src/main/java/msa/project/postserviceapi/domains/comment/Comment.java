package msa.project.postserviceapi.domains.comment;

import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_seq", nullable = false, unique = true)
    private String userSeq;

    @Column(name = "content", nullable = false)
    private String content;

}
