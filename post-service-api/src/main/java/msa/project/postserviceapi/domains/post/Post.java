package msa.project.postserviceapi.domains.post;

import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_seq", nullable = false)
    private String userSeq;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "writer_name")
    private String writerName;
}
