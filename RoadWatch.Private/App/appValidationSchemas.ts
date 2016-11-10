var reportRoadCondition = {
    roadCondition: {
        'validations': 'required'
    },
    impassableType: {
        'validations': 'required'
    },
    collisionType: {
        'validations': 'required'
    },
    floodSeverity: {
        'validations': 'required'
    },
    specialEventDetails: {
        'validations': 'required'
    },
    commonType: {
        'validations': 'required'
    },
    area: {
        'validations': 'required'
    },
    road: {
        'validations': 'required'
    }
}

var newAnnouncement = {
    title: {
        'validations': 'required'
    },
    message: {
        'validations': 'required'
    }
}

angularApplication.config(['validationSchemaProvider', validationSchemaProvider => {
    validationSchemaProvider.set("ReportRoadCondition", reportRoadCondition);
    validationSchemaProvider.set("NewAnnouncement", newAnnouncement);
}]);