import {BlogService} from "../services/blogService";
import {getLogin} from "../utils/middlewares/auth";
import {getApiUrl} from "../utils/api";
import {Routes} from "../routes";
import {successResponse} from "./helpers";
import {HttpCodes} from "../utils/http";

const blogService = new BlogService();

export class BlogController {

    async create(req, res) {
        const blog = await blogService.create(req.body, getLogin(req.body));
        successResponse(res, blog, {
            headers: {location: getApiUrl(Routes.getBlog, {id: blog._id})},
            successCode: HttpCodes.Created
        });
    }

    async update(req, res) {
        successResponse(res, await blogService.update(req.body,getLogin(req.body), req.params['id']));
    }

    async delete(req, res) {
        await blogService.delete(req.params['id'], getLogin(req.body));
        successResponse(res);
    }

    async list(req, res) {
        const list = await blogService.list();
        successResponse(res, list);
    }

    async get(req, res) {
        successResponse(res, await blogService.get(req.params['id']));
    }
}
