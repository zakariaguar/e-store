package com.estore.controlleradmin;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")  // ← AJOUTE ICI
public class FileUploadController {

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file,
                                         @RequestParam("categoryId") Long categoryId) {
        try {
            String categoryFolder;
            switch (categoryId.intValue()) {
                case 1: categoryFolder = "smartphones"; break;
                case 2: categoryFolder = "ordinateurs"; break;
                case 3: categoryFolder = "electromenager"; break;
                case 4: categoryFolder = "tv-audio"; break;
                default: categoryFolder = "default";
            }

            String uploadDir = "frontend/public/images/" + categoryFolder + "/";
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath);

            Map<String, String> response = new HashMap<>();
            response.put("imageUrl", "/images/" + categoryFolder + "/" + fileName);

            return ResponseEntity.ok(response);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de l'upload");
        }
    }
}