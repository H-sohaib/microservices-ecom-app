package net.anassploit.commandservice.service;

import net.anassploit.commandservice.dto.CommandRequest;
import net.anassploit.commandservice.dto.CommandResponse;
import net.anassploit.commandservice.enums.CommandStatus;

import java.util.List;

public interface CommandService {

    CommandResponse createCommand(CommandRequest request);

    CommandResponse getCommandById(Long commandId);

    List<CommandResponse> getAllCommands();

    List<CommandResponse> getCommandsByStatus(CommandStatus status);

    CommandResponse updateCommand(Long commandId, CommandRequest request);

    CommandResponse updateCommandStatus(Long commandId, CommandStatus status);

    void deleteCommand(Long commandId);

    void cancelCommand(Long commandId);
}

