package com.jovz.gl_residences_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jovz.gl_residences_backend.model.Announcement;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
}
