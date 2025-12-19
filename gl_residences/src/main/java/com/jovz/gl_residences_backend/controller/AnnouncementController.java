package com.jovz.gl_residences_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jovz.gl_residences_backend.model.Announcement;
import com.jovz.gl_residences_backend.repository.AnnouncementRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/announcements")
public class AnnouncementController {

    private final AnnouncementRepository repo;

    public AnnouncementController(AnnouncementRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Announcement> all() {
        return repo.findAll();
    }

    @PostMapping
    public Announcement create(@RequestBody Map<String, Object> request) {

        Announcement a = new Announcement();
        a.setTitle((String) request.get("title"));
        a.setBody((String) request.get("description"));  // <-- FIXED
        a.setPostedAt(LocalDateTime.now());

        return repo.save(a);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Map<String, Object> request) {
        return repo.findById(id).map(existing -> {

            existing.setTitle((String) request.get("title"));
            existing.setBody((String) request.get("description")); // <-- FIXED

            repo.save(existing);
            return ResponseEntity.ok(existing);

        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
