package com.kong.authtest.karlo.service;


import com.kong.authtest.karlo.dto.KarloRequest;
import com.kong.authtest.karlo.dto.KarloResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpHeaders.CONTENT_TYPE;

@Service
@RequiredArgsConstructor
@Slf4j
public class KarloService {

    private static final int MAX_RETRIES = 3;
    private static final int WAIT_TIME_IN_MS = 1000; // 1초

    private static final String API_KEY = "KakaoAK f66e810c3f997ea0220e354d8e04017a";

    private final RestTemplate restTemplate = new RestTemplate();

    private final HashMap<String, String> params = new HashMap<>();


    public KarloResponse createImage(KarloRequest karloRequest) throws Exception {

        params.put("prompt", karloRequest.getPrompt());
        params.put("negative_prompt", karloRequest.getNegative_prompt());
        KarloResponse karloResponse = getKarloResponse();
        saveImageLocal(karloResponse);


        return karloResponse;
    }

    @Nullable
    private KarloResponse getKarloResponse() throws Exception {
        KarloResponse karloResponse = JsonUtil.fromJson(
                getApiAccess(setKarloApiHeaders()).getBody(),
                KarloResponse.class);
        return karloResponse;
    }

    @NotNull
    private static HttpHeaders setKarloApiHeaders() {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
        httpHeaders.set(AUTHORIZATION, API_KEY);
        return httpHeaders;
    }

    @NotNull
    private ResponseEntity<String> getApiAccess(HttpHeaders httpHeaders) throws Exception {
        URI uri = URI.create("https://api.kakaobrain.com/v2/inference/karlo/t2i");

        ResponseEntity<String> response = null;
        int attempt = 0;
        while (attempt < MAX_RETRIES) {
            try {
                response = restTemplate.exchange(
                        uri,
                        HttpMethod.POST,
                        new HttpEntity<>(params, httpHeaders),
                        String.class
                );

                if (response.getStatusCode().is2xxSuccessful()) {
                    break; // 성공적으로 응답을 받았으므로 반복문 종료
                }
            } catch (Exception e) {
                if (e instanceof HttpClientErrorException &&
                        ((HttpClientErrorException) e).getStatusCode().value() == 500) {
                    log.warn("500 에러 발생. 재시도 중... (시도: " + (attempt + 1) + ")");
                    attempt++;

                    try {
                        Thread.sleep(WAIT_TIME_IN_MS);
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                    }
                } else {
                    throw e;
                }
            }
        }

        if (response == null || !response.getStatusCode().is2xxSuccessful()) {
            log.error("API 요청 실패. 재시도를 모두 소진함.");
            throw new Exception("API 요청 실패");
        }
        return response;
    }

    private static void saveImageLocal(KarloResponse karloResponse) {
        String image = karloResponse.getImages().get(0).getImage();

        // 바이트 배열을 파일에 저장
        try {
            String fileName = "outputImage_" + System.currentTimeMillis() + ".jpg";

            String savePath = "src/main/resources/static/" + fileName;

            URL url = new URL(image);
            URLConnection connection = url.openConnection();
            InputStream in = connection.getInputStream();
            FileOutputStream out = new FileOutputStream(savePath);

            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = in.read(buffer)) != -1) {
                out.write(buffer, 0, bytesRead);
            }
            karloResponse.setFileName(image);

            in.close();
            out.close();
            System.out.println("이미지 성공적으로 저장됨 " + new File(savePath).getCanonicalPath());
        } catch (IOException e) {
            System.err.println("이미지 생성중 에러");
            e.printStackTrace();
        }
    }


}
