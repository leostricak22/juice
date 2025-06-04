package hr.blitz.juice.rest.controller;

import hr.blitz.juice.domain.model.Terrain;
import hr.blitz.juice.rest.dto.HallRequest;
import hr.blitz.juice.rest.dto.TerrainRequest;
import hr.blitz.juice.service.HallService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hall")
@AllArgsConstructor
public class HallController {

    private final HallService hallService;

    @GetMapping
    public ResponseEntity<?> getAllHalls() {
        return ResponseEntity.ok(hallService.getAllHalls());
    }

    @PostMapping
    public ResponseEntity<?> createHall(@Valid @RequestBody HallRequest hallRequest) {
        return ResponseEntity.ok(hallService.saveHall(hallRequest));
    }

    @GetMapping("/{id}/terrain")
    public ResponseEntity<List<Terrain>> getHallTerrain(@PathVariable String id) {
        return ResponseEntity.ok(hallService.getHallTerrains(id));
    }

    @PostMapping("/{id}/terrain")
    public ResponseEntity<?> addTerrainToHall(@PathVariable String id, @Valid @RequestBody TerrainRequest terrain) {
        return ResponseEntity.ok(hallService.addTerrainToHall(id, terrain));
    }
}
