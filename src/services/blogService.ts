import {GET, Path} from "typescript-rest";

@Path('')
export class BlogService {
    @GET
    @Path('/blog')
    public async get() {
        return null;
    }
}
