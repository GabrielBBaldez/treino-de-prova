package com.questify.model;

import com.questify.model.enums.QuestionType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question {

    private String id;

    @NotNull
    private QuestionType type;

    @NotBlank
    private String text;

    private String image;

    @NotEmpty
    @Valid
    private List<Alternative> alternatives;

    @NotBlank
    private String correctAnswer;

    private String explanation;

    private List<String> tags;

    private List<Assertion> assertions;
}
