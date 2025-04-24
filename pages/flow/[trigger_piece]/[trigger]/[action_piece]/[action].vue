<script setup>
import { useRoute } from 'vue-router'

definePageMeta({
  layout: false
})

const route = useRoute()

let triggerPieceName = null;
let triggerName = null;
let actionPieceName = null;
let actionName = null;

let triggerPiece = null;
let actionPiece = null;
let trigger = null;
let action = null;

if (route.params.trigger_piece != 'any') {
    triggerPieceName = route.params.trigger_piece;
    triggerName = route.params.trigger;

    const { data: triggerResponse } = await useFetch(`https://cloud.activepieces.com/api/v1/pieces/@activepieces/piece-${triggerPieceName}`)
    triggerPiece = triggerResponse.value;
    trigger = triggerPiece.triggers[triggerName];
}

if (route.params.action_piece != 'any') {
    actionPieceName = route.params.action_piece;
    actionName = route.params.action;

    const { data: actionResponse } = await useFetch(`https://cloud.activepieces.com/api/v1/pieces/@activepieces/piece-${actionPieceName}`)
    actionPiece = actionResponse.value;
    action = actionPiece.actions[actionName]
}

let template = {
    "name": "Untitled",
    "description": "",
    "tags": [],
    "pieces": [],
    created: (Math.floor(Date.now() / 1000)).toString(),
    imageUrl: null,
    updated: (Math.floor(Date.now() / 1000)).toString(),
    userId: "WtvhvT5ddNc0Aqv5HZglC",
    "blogUrl": "",
    "template": {
        "displayName": "Untitled",
        "trigger": {
            "name": "trigger",
            "valid": false,
            "displayName": "Select Trigger",
            "nextAction": {
                "name": "step_1",
                "type": "PIECE",
                "valid": false,
                "settings": {
                    "input": {},
                    "pieceName": "",
                    "inputUiInfo": {},
                    "pieceVersion": "",
                    "pieceType": "OFFICIAL",
                    "packageType": "REGISTRY"
                },
                "displayName": ""
            },
            "type": "EMPTY",
            "settings": {
                "inputUiInfo": {}
            }
        },
        "valid": false
    }
}

if (triggerPiece != null && actionPiece != null) {
    template.name = template.template.displayName = `${actionPiece.displayName} + ${triggerPiece.displayName}`;
} else if (triggerPiece == null && actionPiece != null) {
    template.name = template.template.displayName = `${actionPiece.displayName} Automation`;
} else if (triggerPiece != null && actionPiece == null) {
    template.name = template.template.displayName = `${triggerPiece.displayName} Automation`;
}

if (triggerPiece != null) template.pieces.push(triggerPiece.name)
if (actionPiece != null) template.pieces.push(actionPiece.name)

if (trigger != null) {
    template.template.trigger.displayName = trigger.displayName;
    template.template.trigger.type = "PIECE_TRIGGER";
    template.template.trigger.valid = Object.keys(trigger.props).filter((key) => trigger.props[key].required).length === 0;
    template.template.trigger.settings = {
        "input": {},
        "pieceName": triggerPiece.name,
        "triggerName": trigger.name,
        "inputUiInfo": {},
        "pieceVersion": "~" + triggerPiece.version,
        "pieceType": "OFFICIAL",
        "packageType": "REGISTRY"
    }
}

if (action != null) {
    template.template.trigger.nextAction = {
        "name": "step_1",
        type: "PIECE",
        "valid": Object.keys(action.props).filter((key) => action.props[key].required).length === 0,
        settings: {
            "input": {},
            "pieceName": actionPiece.name,
            "actionName": action.name,
            "inputUiInfo": {},
            "pieceVersion": "~"+ actionPiece.version,
            "pieceType": "OFFICIAL",
            "packageType": "REGISTRY"
        },
        displayName: action.displayName
    }
} else {
    delete template.template.trigger.nextAction;
}

await navigateTo(`https://cloud.activepieces.com/import-flow-uri-encoded?flow=${encodeURIComponent(JSON.stringify(template))}`, { external: true })
</script>

<template>
<div>
</div>
</template>