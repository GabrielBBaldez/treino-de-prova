package com.questify.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResultStatsResponse {

    private int totalAttempts;
    private double averagePercentage;
    private double bestPercentage;
    private double averageTimeTakenSeconds;
}
