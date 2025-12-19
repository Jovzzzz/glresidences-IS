package com.jovz.gl_residences_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tenants")
public class Tenant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String room; 

    private String contact;

    public Tenant() {}

    public Tenant(String name, String room, String contact) {
        this.name = name;
        this.room = room;
        this.contact = contact;
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getRoom() { return room; }

    public void setRoom(String room) { this.room = room; }

    public String getContact() { return contact; }

    public void setContact(String contact) { this.contact = contact; }
}