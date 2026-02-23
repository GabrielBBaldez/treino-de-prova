package com.questify.dto.request;

import com.questify.model.Question;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class UpdateQuizRequest {

    @NotBlank(message = "Titulo e obrigatorio")
    private String title;

    private String description;

    private String subject;

    @NotEmpty(message = "Precisa ter pelo menos 1 questao")
    @Valid
    private List<Question> questions;
}
