package com.questify.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;
import java.util.Map;

@Data
@AllArgsConstructor
public class ErrorResponse {

    private int status;
    private String message;
    private Instant timestamp;
    private Map<String, String> fieldErrors;
}
