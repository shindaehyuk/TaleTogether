package com.kong.authtest.karlo.service;


import com.kong.authtest.karlo.dto.KarloRequest;
import com.kong.authtest.karlo.dto.KarloResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.HashMap;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpHeaders.CONTENT_TYPE;

@Service
@RequiredArgsConstructor
@Slf4j
public class KarloService {

    private static final String API_KEY = "KakaoAK 28d07bc48030ec0d9213f4223cfd3298";

    private final RestTemplate restTemplate = new RestTemplate();

    private final HashMap<String, String> params = new HashMap<>();


    public KarloResponse createImage(KarloRequest karloRequest) {

        params.put("prompt", karloRequest.getPrompt());
        params.put("negative_prompt", karloRequest.getNegative_prompt());

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
        httpHeaders.set(AUTHORIZATION, API_KEY);

        URI uri = URI.create("https://api.kakaobrain.com/v2/inference/karlo/t2i");

        ResponseEntity<String> response = restTemplate.exchange(
                uri,
                HttpMethod.POST,
                new HttpEntity<>(params, httpHeaders),
                String.class
        );


        KarloResponse karloResponse = JsonUtil.fromJson(response.getBody(), KarloResponse.class);

        return karloResponse;
    }


}
