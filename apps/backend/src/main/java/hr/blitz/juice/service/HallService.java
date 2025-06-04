package hr.blitz.juice.service;

import hr.blitz.juice.domain.model.Hall;
import hr.blitz.juice.domain.model.Terrain;
import hr.blitz.juice.repository.HallRepository;
import hr.blitz.juice.repository.TerrainRepository;
import hr.blitz.juice.rest.dto.HallRequest;
import hr.blitz.juice.rest.dto.HallResponse;
import hr.blitz.juice.rest.dto.TerrainRequest;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HallService {

    private final HallRepository hallRepository;
    private final ModelMapper modelMapper;
    private final TerrainRepository terrainRepository;

    public HallService(HallRepository hallRepository, ModelMapper modelMapper, TerrainRepository terrainRepository) {
        this.hallRepository = hallRepository;
        this.modelMapper = modelMapper;
        this.terrainRepository = terrainRepository;
    }

    public HallResponse saveHall(Hall hall) {
        Hall savedHall = hallRepository.save(hall);
        return modelMapper.map(savedHall, HallResponse.class);
    }

    public HallResponse saveHall(HallRequest hallRequest) {
        Hall hall = modelMapper.map(hallRequest, Hall.class);
        return saveHall(hall);
    }

    public List<HallResponse> getAllHalls() {
        List<Hall> halls = hallRepository.findAll();

        List<HallResponse> hallResponses = new ArrayList<>();
        for (Hall hall : halls) {
            hallResponses.add(modelMapper.map(hall, HallResponse.class));
        }

        return hallResponses;
    }

    public List<Terrain> getHallTerrains(String hallId) {
        Hall hall = hallRepository.findById(hallId)
                .orElseThrow(() -> new RuntimeException("Hall not found with id: " + hallId));
        return hall.getTerrains();
    }

    public HallResponse addTerrainToHall(String hallId, TerrainRequest terrain) {
        Hall hall = hallRepository.findById(hallId)
                .orElseThrow(() -> new RuntimeException("Hall not found with id: " + hallId));

        List<Terrain> terrains = hall.getTerrains();
        if (terrains == null) {
            terrains = new ArrayList<>();
        }

        terrains.add(terrainRepository.save(Terrain.builder().name(terrain.getName()).build()));
        hall.setTerrains(terrains);

        Hall updatedHall = hallRepository.save(hall);
        return modelMapper.map(updatedHall, HallResponse.class);
    }
}
