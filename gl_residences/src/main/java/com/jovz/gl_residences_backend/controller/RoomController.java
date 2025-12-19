package com.jovz.gl_residences_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jovz.gl_residences_backend.model.Room;
import com.jovz.gl_residences_backend.model.Tenant;
import com.jovz.gl_residences_backend.repository.RoomRepository;
import com.jovz.gl_residences_backend.repository.TenantRepository;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomRepository roomRepo;
    private final TenantRepository tenantRepo;

    public RoomController(RoomRepository roomRepo, TenantRepository tenantRepo) {
        this.roomRepo = roomRepo;
        this.tenantRepo = tenantRepo;
    }

    @GetMapping
    public List<Room> getAllRooms() {
        return roomRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRoom(@PathVariable Long id) {
        return roomRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Room createRoom(@RequestBody Room room) {

        // Default values
        if (room.getStatus() == null || room.getStatus().isEmpty()) {
            room.setStatus("Vacant");
        }

        if (room.getRate() == null) {
            room.setRate(0.0);
        }

        return roomRepo.save(room);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateRoom(@PathVariable Long id, @RequestBody Room roomData) {
        return roomRepo.findById(id).map(room -> {
            room.setRoomNumber(roomData.getRoomNumber());
            room.setFloor(roomData.getFloor());
            room.setRate(roomData.getRate());
            room.setStatus(roomData.getStatus());

            roomRepo.save(room);
            return ResponseEntity.ok(room);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRoom(@PathVariable Long id) {
        if (!roomRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        roomRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{roomId}/assign/{tenantId}")
    public ResponseEntity<?> assignTenantToRoom(
            @PathVariable Long roomId,
            @PathVariable Long tenantId) {

        Room room = roomRepo.findById(roomId).orElse(null);
        Tenant tenant = tenantRepo.findById(tenantId).orElse(null);

        if (room == null || tenant == null) {
            return ResponseEntity.badRequest().body("Room or Tenant not found");
        }

        room.setStatus("Occupied");
        roomRepo.save(room);

        tenant.setRoom(room.getRoomNumber());
        tenantRepo.save(tenant);

        return ResponseEntity.ok("Tenant assigned to room successfully");
    }

  
    @PutMapping("/{roomId}/vacate")
    public ResponseEntity<?> vacateRoom(@PathVariable Long roomId) {

        Room room = roomRepo.findById(roomId).orElse(null);
        if (room == null) return ResponseEntity.notFound().build();

        room.setStatus("Vacant");
        roomRepo.save(room);

        List<Tenant> tenants = tenantRepo.findByRoom(room.getRoomNumber());
        for (Tenant t : tenants) {
            t.setRoom(null);
            tenantRepo.save(t);
        }

        return ResponseEntity.ok("Room vacated");
    }
}
