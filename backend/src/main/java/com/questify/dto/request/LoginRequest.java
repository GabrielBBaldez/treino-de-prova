package com.questify.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {

    @NotBlank(message = "Email e obrigatorio")
    @Email
    private String email;

    @NotBlank(message = "Senha e obrigatoria")
    private String password;
}
