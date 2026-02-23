package com.questify.model;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Document(collection = "quizzes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Quiz {

    @Id
    private String id;

    @NotBlank
    private String title;

    private String description;

    private String subject;

    @NotEmpty
    @Valid
    private List<Question> questions;

    @Indexed
    private String userId;

    private Instant createdAt;

    private Instant updatedAt;
}
