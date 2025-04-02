package hr.blitz.juice.service;

import hr.blitz.juice.domain.model.Hall;
import hr.blitz.juice.repository.HallRepository;
import hr.blitz.juice.rest.dto.HallRequest;
import hr.blitz.juice.rest.dto.HallResponse;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HallService {

    private final HallRepository hallRepository;
    private final ModelMapper modelMapper;

    public HallService(HallRepository hallRepository, ModelMapper modelMapper) {
        this.hallRepository = hallRepository;
        this.modelMapper = modelMapper;
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
}
