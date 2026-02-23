package com.questify.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateProfileRequest {

    @Size(min = 1, message = "Nome nao pode ser vazio")
    private String name;

    @Email(message = "Email invalido")
    private String email;
}
