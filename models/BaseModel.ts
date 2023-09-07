/* eslint-disable class-methods-use-this */
abstract class BaseModel {
    static toInternal(config: object) {
        return config;
    }

    abstract toExternal();
}

export default BaseModel;
