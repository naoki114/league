import { createStore, applyMiddleware } from 'redux';
import generalMiddleware from './middlewares/generalMiddleware.js';

/**
 * storeの設定・生成を行うcreateStoreのラッパー
 */
export default function configureStore(reducer) {
    return createStore(
        reducer,
        applyMiddleware(
            generalMiddleware
        )
    );
}
