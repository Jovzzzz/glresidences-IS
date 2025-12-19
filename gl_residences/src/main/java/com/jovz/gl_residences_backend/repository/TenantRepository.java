package com.jovz.gl_residences_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jovz.gl_residences_backend.model.Tenant;

import java.util.List;

@Repository
public interface TenantRepository extends JpaRepository<Tenant, Long> {
    List<Tenant> findByRoom(String room);
}
