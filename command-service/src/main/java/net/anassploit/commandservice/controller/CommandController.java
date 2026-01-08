package net.anassploit.commandservice.controller;

import jakarta.validation.Valid;
import net.anassploit.commandservice.dto.CommandRequest;
import net.anassploit.commandservice.dto.CommandResponse;
import net.anassploit.commandservice.dto.CommandStatusUpdateRequest;
import net.anassploit.commandservice.enums.CommandStatus;
import net.anassploit.commandservice.service.CommandService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/commands")
public class CommandController {

    private static final Logger log = LoggerFactory.getLogger(CommandController.class);

    private final CommandService commandService;

    public CommandController(CommandService commandService) {
        this.commandService = commandService;
    }

    @PostMapping
    public ResponseEntity<CommandResponse> createCommand(@Valid @RequestBody CommandRequest request) {
        log.info("Received request to create command with {} items", request.getItems().size());
        CommandResponse response = commandService.createCommand(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{commandId}")
    public ResponseEntity<CommandResponse> getCommandById(@PathVariable Long commandId) {
        log.info("Received request to get command with ID: {}", commandId);
        CommandResponse response = commandService.getCommandById(commandId);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<CommandResponse>> getAllCommands(
            @RequestParam(required = false) CommandStatus status) {
        log.info("Received request to get commands with status filter: {}", status);
        List<CommandResponse> response;
        if (status != null) {
            response = commandService.getCommandsByStatus(status);
        } else {
            response = commandService.getAllCommands();
        }
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{commandId}")
    public ResponseEntity<CommandResponse> updateCommand(
            @PathVariable Long commandId,
            @Valid @RequestBody CommandRequest request) {
        log.info("Received request to update command with ID: {}", commandId);
        CommandResponse response = commandService.updateCommand(commandId, request);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{commandId}/status")
    public ResponseEntity<CommandResponse> updateCommandStatus(
            @PathVariable Long commandId,
            @Valid @RequestBody CommandStatusUpdateRequest request) {
        log.info("Received request to update command {} status to {}", commandId, request.getStatus());
        CommandResponse response = commandService.updateCommandStatus(commandId, request.getStatus());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{commandId}/cancel")
    public ResponseEntity<Void> cancelCommand(@PathVariable Long commandId) {
        log.info("Received request to cancel command with ID: {}", commandId);
        commandService.cancelCommand(commandId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{commandId}")
    public ResponseEntity<Void> deleteCommand(@PathVariable Long commandId) {
        log.info("Received request to delete command with ID: {}", commandId);
        commandService.deleteCommand(commandId);
        return ResponseEntity.noContent().build();
    }
}

