package com.jovz.gl_residences_backend.controller;

import org.springframework.web.bind.annotation.*;

import com.jovz.gl_residences_backend.model.Tenant;
import com.jovz.gl_residences_backend.repository.TenantRepository;

import java.util.List;

@RestController
@RequestMapping("/api/tenants")
@CrossOrigin(origins = "*") 
public class TenantController {

    private final TenantRepository tenantRepository;

    public TenantController(TenantRepository tenantRepository) {
        this.tenantRepository = tenantRepository;
    }

    @GetMapping
    public List<Tenant> getAllTenants() {
        return tenantRepository.findAll();
    }

    @PostMapping
    public Tenant createTenant(@RequestBody Tenant tenant) {
        return tenantRepository.save(tenant);
    }

    @PutMapping("/{id}")
    public Tenant updateTenant(@PathVariable Long id, @RequestBody Tenant tenantDetails) {
        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tenant not found with id " + id));

        tenant.setName(tenantDetails.getName());
        tenant.setRoom(tenantDetails.getRoom()); 
        tenant.setContact(tenantDetails.getContact());

        return tenantRepository.save(tenant);
    }

    @DeleteMapping("/{id}")
    public void deleteTenant(@PathVariable Long id) {
        tenantRepository.deleteById(id);
    }
}