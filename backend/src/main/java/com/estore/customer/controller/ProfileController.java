package com.estore.customer.controller;

import com.estore.customer.entity.Profile;
import com.estore.customer.entity.User;
import com.estore.customer.repository.ProfileRepository;
import com.estore.customer.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/profiles")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    @GetMapping("/user/{userId}")
    public ResponseEntity<Profile> getProfileByUserId(@PathVariable Long userId) {
        Optional<Profile> profile = profileRepository.findByUserId(userId);
        if (profile.isPresent()) {
            Profile p = profile.get();
            p.setUser(null);
            return ResponseEntity.ok(p);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Profile> createProfile(@RequestBody Profile profile) {
        // Le frontend envoie un objet avec userId à l'intérieur
        Long userId = profile.getUser().getId();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        Profile newProfile = new Profile();
        newProfile.setPhone(profile.getPhone());
        newProfile.setAddress(profile.getAddress());
        newProfile.setCity(profile.getCity());
        newProfile.setCountry(profile.getCountry());
        newProfile.setUser(user);

        Profile saved = profileRepository.save(newProfile);
        saved.setUser(null);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Profile> updateProfile(@PathVariable Long id, @RequestBody Profile profile) {
        Optional<Profile> existing = profileRepository.findById(id);
        if (existing.isPresent()) {
            Profile existingProfile = existing.get();
            existingProfile.setPhone(profile.getPhone());
            existingProfile.setAddress(profile.getAddress());
            existingProfile.setCity(profile.getCity());
            existingProfile.setCountry(profile.getCountry());

            Profile saved = profileRepository.save(existingProfile);
            saved.setUser(null);
            return ResponseEntity.ok(saved);
        }
        return ResponseEntity.notFound().build();
    }
}