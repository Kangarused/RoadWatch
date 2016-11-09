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
};
angularApplication.config(['validationSchemaProvider', function (validationSchemaProvider) {
        validationSchemaProvider.set("ReportRoadCondition", reportRoadCondition);
    }]);
//# sourceMappingURL=appValidationSchemas.js.map